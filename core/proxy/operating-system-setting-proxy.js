var OperatingSystemSetting = require("core/model/system-setting").OperatingSystemSetting;

/**
 * @class OperatingSystemSettingProxy
 */
var OperatingSystemSettingProxy = exports.OperatingSystemSettingProxy = function OperatingSystemSettingProxy () {};


OperatingSystemSettingProxy.createFromOperatingSystemSetting = function (_operatingSystemSetting) {
    if (_operatingSystemSetting instanceof OperatingSystemSetting) {
        var operatingSystemSettingProxy = new OperatingSystemSettingProxy();

        operatingSystemSettingProxy.isAutotuneEnabled = _operatingSystemSetting.isAutotuneEnabled;
        operatingSystemSettingProxy.isConsoleCLIEnabled = _operatingSystemSetting.isConsoleCLIEnabled;
        operatingSystemSettingProxy.isPowerdEnabled = _operatingSystemSetting.isPowerdEnabled;
        operatingSystemSettingProxy.isAutoUploadCrashEnabled = _operatingSystemSetting.isAutoUploadCrashEnabled;
        operatingSystemSettingProxy.swapOnDrive = _operatingSystemSetting.swapOnDrive;

        return operatingSystemSettingProxy;
    }
};


OperatingSystemSettingProxy.prototype = new OperatingSystemSetting();
