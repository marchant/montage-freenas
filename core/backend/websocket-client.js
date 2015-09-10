var HandlerPool = require("core/backend/handler-pool").HandlerPool,
    Application = require("montage/core/application").application,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    ResponseCommand = require("core/backend/response-command").ResponseCommand;


var WebSocketClient = exports.WebSocketClient = function WebSocketClient () {
    this._handlerPool = new HandlerPool();
    this._pendingCommands = [];
};


WebSocketClient.prototype._socket = null;
WebSocketClient.prototype._isConnecting = false;


/**
 * @function
 * @public
 *
 * @description Establish a web-socket connection between the FreeNas App and the FreeNas Server.
 *
 * @returns {Promise}
 */
WebSocketClient.prototype.connect = function () {
    if (!this._isConnecting) {
        var deferred = Promise.defer();

        if (this._socket) {
            this._resetConnection();
        }

        this._socket = new WebSocket(Application.configuration.WEB_SOCKET_URL);

        this._isConnecting = true;
        this._connectDeferred = deferred;

        this._addListeners(deferred);

        return deferred.promise;
    }

    return Promise.reject("Web Socket already connecting");
};


WebSocketClient.prototype.reConnect = function () {
    if (this._socket) {
        this._resetConnection();
    }

    return this.connect();
};


/**
 * @function
 * @private
 *
 * @description A event listeners on the web-socket.
 * Will take care of open, message, error and close events.
 *
 * @params {Promise} - Promise that will be resolved when the connection will be opened.
 */
WebSocketClient.prototype._addListeners = function () {
    if (this._socket) {
        var self = this;

        this._socket.onerror = function (errorEvent) {
            self._handleErrorConnection(errorEvent);
        };

        this._socket.onopen = function (openEvent) {
            this._isConnecting = false;

            self._handleOpenConnection(openEvent);

            self._socket.onmessage = function (messageEvent) {
                self._handleMessage(messageEvent);
            };

            self._socket.onclose = function (closeEvent) {
                self._handleCloseConnection(closeEvent);
            };
        };
    } else {
        this._connectDeferred.reject(new Error("WebSocket non initialized"));
        this._connectDeferred = null;
    }
};


/**
 * @function
 * @private
 *
 * @description Resolve the "connect promise" when the connection is open.
 * Will take of all the pending commands.
 *
 * @params {Event} event - OpenEvent.
 * @params {Promise} connectDeferred - Promise that will be resolved when the connection will be opened.
 */
WebSocketClient.prototype._handleOpenConnection = function (event) {
    this._connectDeferred.resolve(event);
    this._connectDeferred = null;

    var command;

    while (this._pendingCommands.length) {
        command = this._pendingCommands.pop();

        this._sendCommand(command.messageCommand, command.deferred);
    }
};


/**
 * @function
 * @private
 *
 * @description Handle MessageEvent.
 *
 * @params {Event} event - MessageEvent.
 */
WebSocketClient.prototype._handleMessage = function (_event) {
    try {
        // Decode the Message
        var data = JSON.parse(_event.data);

        if (data && data.id) {
            // try to find a "promise" that will handle this message according to its unique ID
            var deferred = this._handlerPool.releaseHandler(data.id);

            if (deferred) {
                if (data.name === "response") { // maybe event ?
                    deferred.resolve(new ResponseCommand(data.args, data));

                } else {
                    deferred.reject("Need investigate");
                }
            } else {
                console.warn("Message received but no handler has been found");
            }
        }
    } catch (error) {
        console.error(error);
    }
};


/**
 * @function
 * @private
 *
 * @description Handle ErrorEvent.
 *
 * @params {Event} event - ErrorEvent.
 * Reset the connection.
 */
WebSocketClient.prototype._handleErrorConnection = function (event) {
    var state = this._socket.readyState;

    if (this._isConnecting && (state === WebSocket.CLOSING || state === WebSocket.CLOSED)) {
        this._connectDeferred.reject(new Error("connection failed"));
        this._connectDeferred = null;
    } else {
        console.error(event);
    }

    this._resetConnection();
};


/**
 * @function
 * @private
 *
 * @description Handle CloseEvent.
 * Reset the connection.
 *
 * @params {Event} event - CloseEvent.
 */
WebSocketClient.prototype._handleCloseConnection = function () {
    this._reset();
};


/**
 * @function
 * @private
 *
 * @description Reset the WebSocketClient.
 * Reset the connection.
 * Remove all pending handlers.
 * Remove all pending commands.
 */
WebSocketClient.prototype._reset = function () {
    this._resetConnection();
    this._handlerPool.clear();
    this._clearPendingCommands();
};


WebSocketClient.prototype._resetConnection = function () {
    if (this._socket && this._socket.readyState !== WebSocket.CLOSED) {
        this._socket.close(); //if already closed, will do nothing
    }

    this._socket = null;
    this._isConnecting = false;
};

/**
 * @function
 * @private
 *
 * @description Remove all pending commands.
 */
WebSocketClient.prototype._clearPendingCommands = function () {
    while (this._pendingCommands.length) {
        this._pendingCommands.pop();
    }
};


/**
 * @function
 * @private
 *
 * @description Add a pending MessageCommand, used when the web-socket is closed or re-connecting.
 *
 * @params {Object} _messageCommand - a MessageCommand Command.
 * @params {Promise} deferred - Command Handler.
 */
WebSocketClient.prototype._addPendingCommand = function (_messageCommand, deferred) {
    this._pendingCommands.push({
        deferred: deferred,
        messageCommand: _messageCommand
    });
};


/**
 * @function
 * @public
 *
 * @description Sends a MessageCommand to the server.
 *
 * @params {Object} _messageCommand - a MessageCommand.
 *
 * @returns {Promise}
 */
WebSocketClient.prototype.sendCommand = function (_messageCommand) {
    var deferred = Promise.defer();

    if (_messageCommand instanceof MessageCommand) {
        if (this._socket && this._socket.readyState == WebSocket.OPEN) {
            this._sendCommand(_messageCommand, deferred);
        } else if (this._socket && this._socket.readyState == WebSocket.CONNECTING) {
            this._addPendingCommand(_messageCommand, deferred);
        } else {
            this._addPendingCommand(_messageCommand, deferred);
            this.connect().catch(Function.noop).done();
        }
    } else {
        deferred.reject("Sending a command requires a MessageCommand Object");
    }

    return deferred.promise;
};


/**
 * @function
 * @private
 *
 * @description Sends a MessageCommand to the server.
 *
 * @params {Object} _messageCommand - a MessageCommand.
 * @params {Promise} deferred - MessageCommand Handler.
 */
WebSocketClient.prototype._sendCommand = function (_messageCommand, _deferred) {
    _messageCommand.id = this._handlerPool.addHandler(_deferred);

    //todo use bluebird Promise
    //_deferred.promise.timeout(_messageCommand.timeout).catch(Promise.TimeoutError, function (e) {
    //    console.error(e.message);
    //});

    this._socket.send(_messageCommand.toJSON());
};
