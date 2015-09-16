var ConsoleSetting = require("core/model/system-setting").ConsoleSetting;

/**
 * @class ConsoleSettingProxy
 */
var ConsoleSettingProxy = exports.ConsoleSettingProxy = function ConsoleSettingProxy () {};


ConsoleSettingProxy.createFromConsoleSetting = function (_consoleSetting) {
    if (_consoleSetting instanceof ConsoleSetting) {
        var consoleSettingProxy = new ConsoleSettingProxy();

        consoleSettingProxy.isConsoleScreenSaverEnabled = _consoleSetting.isConsoleScreenSaverEnabled;
        consoleSettingProxy.isSerialConsoleEnabled = _consoleSetting.isSerialConsoleEnabled;
        consoleSettingProxy.serialPort = _consoleSetting.serialPort;
        consoleSettingProxy.serialSpeed = _consoleSetting.serialSpeed;

        return consoleSettingProxy;
    }
};


ConsoleSettingProxy.prototype = new ConsoleSetting();
