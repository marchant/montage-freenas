var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    ConsoleSetting = require("core/model/system-setting").ConsoleSetting;

/**
 * @class ConsoleSettingProxy
 */
var ConsoleSettingProxy = exports.ConsoleSettingProxy = function ConsoleSettingProxy () {};


ConsoleSettingProxy.createFromConsoleSetting = function (_consoleSetting) {
    if (_consoleSetting instanceof ConsoleSetting) {
        var consoleSettingProxy = new ConsoleSettingProxy();

        consoleSettingProxy._consoleScreenSaverEnabled = _consoleSetting.isConsoleScreenSaverEnabled;
        consoleSettingProxy._serialConsoleEnabled = _consoleSetting.isSerialConsoleEnabled;
        consoleSettingProxy._serialPort = _consoleSetting.serialPort;
        consoleSettingProxy._serialSpeed = _consoleSetting.serialSpeed;

        return consoleSettingProxy;
    }
};


ConsoleSettingProxy.prototype = new AbstractProxy();
ConsoleSettingProxy.prototype._serialConsoleEnabled = false;
ConsoleSettingProxy.prototype._consoleScreenSaverEnabled = false;
ConsoleSettingProxy.prototype._serialPort = null;
ConsoleSettingProxy.prototype._serialSpeed = null;

Object.defineProperties(ConsoleSettingProxy.prototype, {

    isSerialConsoleEnabled: {
        set: function (_serialConsoleEnabled) {
            this._updateValue(ConsoleSetting.prototype, "isSerialConsoleEnabled", _serialConsoleEnabled);
        },
        get: function () {
            return this._serialConsoleEnabled;
        },
        configurable: true
    },

    isConsoleScreenSaverEnabled: {
        set: function (_consoleScreenSaverEnabled) {
            this._updateValue(ConsoleSetting.prototype, "isConsoleScreenSaverEnabled", _consoleScreenSaverEnabled);
        },
        get: function () {
            return this._consoleScreenSaverEnabled;
        },
        configurable: true
    },

    serialPort: {
        set: function (_serialPort) {
            this._updateValue(ConsoleSetting.prototype, "serialPort", _serialPort);
        },
        get: function () {
            return this._serialPort;
        },
        configurable: true
    },

    serialSpeed: {
        set: function (_serialSpeed) {
            this._updateValue(ConsoleSetting.prototype, "serialSpeed", _serialSpeed);
        },
        get: function () {
            return this._serialSpeed;
        },
        configurable: true
    }

});


ConsoleSettingProxy.prototype.toRawObject = function () {
    return {
        serial_console: this._serialConsoleEnabled,
        console_screensaver: this._consoleScreenSaverEnabled
    };
};
