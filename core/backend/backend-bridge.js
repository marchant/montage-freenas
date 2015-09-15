/*global require, exports, document, Error*/
var WebSocketClient = require("core/backend/websocket-client").WebSocketClient;

/**
 * @constructor
 *
 * @description Object used as a bridge to the backend,
 * it will be used for invoking commands and establishing the first connection.
 *
 */
var BackEndBridge = exports.BackEndBridge = function BackEndBridge (_controller) {
    this._connection = new WebSocketClient();
    this._controller = _controller;
};


/**
 * @function
 * @public
 *
 * @description establishes the first connection to the server.
 *
 * @returns {Promise}
 */
BackEndBridge.prototype.connect = function () {
    return this._connection.connect();
};


/**
 * @function
 * @public
 *
 * @description Sends a command.
 *
 * @param {Object} _messageCommand - A object that represents a MessageCommand.
 *
 * @returns {Promise}
 */
BackEndBridge.prototype.send = function (_messageCommand) {
    var self = this;

    return this._connection.sendCommand(_messageCommand).then(function (response) {
        if (self._controller.currentLoggedUser) {
            self._controller.updateSessionToken(response.timestamp);
        }

        return response;
    });
};


BackEndBridge.prototype.reConnect = function () {
    return this._connection.reConnect();
};


BackEndBridge.prototype.disconnect = function disconnect (code, reason) {
    this._connection.close(code, reason);
};
