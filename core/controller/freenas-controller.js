var MessageCommand = require("core/backend/message-command").MessageCommand,
    UserControllerDescriptor = require("core/controller/user-controller").UserController,
    SystemControllerDescriptor = require("core/controller/system-controller").SystemController,
    GroupControllerDescriptor = require("core/controller/group-controller").GroupController;

var FreeNasController = exports.FreeNasController = function FreeNasController () {};


FreeNasController.prototype.initWithBackendBridgeAndApplication = function (_backendBridge, _app) {
    this._backend = _backendBridge;
    this._application = _app;
    this._service = _app.service;

    return this;
};


FreeNasController.prototype.login = function (_authType, _credentials) {
    var promise;

    if (typeof _authType === "string" && _credentials) {
        if (_authType === "userpass" && _credentials.constructor === Array) {
            promise = this.loginWithCredentials(_credentials[0], _credentials[1]); // 0 -> username, 1 -> password

        } else if (_authType === "token" && typeof _credentials === "string") {
            promise = this.loginWithToken(_credentials);
        }
    }

    if (!promise) {
        throw "wrong parameters given";
    }

    return promise;
};


FreeNasController.prototype.loginWithCredentials = function (_username, _password) {
    var messageCommand = new MessageCommand("rpc", "auth", {
        username : _username,
        password : _password
    });

    return this._backend.send(messageCommand);
};


FreeNasController.prototype.loginWithToken = function (_token) {
    return this._backend.send(new MessageCommand("rpc", "auth_token", {token: _token}));
};


Object.defineProperties(FreeNasController.prototype, UserControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, GroupControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, SystemControllerDescriptor);
