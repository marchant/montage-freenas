var WebSocketConfiguration = require("core/configuration/websocket-configuration").WebSocketConfiguration;

var Configuration = exports.Configuration = function Configuration () {};

Object.defineProperties(Configuration.prototype, WebSocketConfiguration);

Configuration.prototype.init = function () {
    this._initWebSocketConfigurationWithTarget(window["__DEVELOPMENT_CONNECTION__"] || "self");

    return this;
};
