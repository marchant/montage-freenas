var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    OperatingSystemSetting = require("core/model/system-setting").OperatingSystemSetting;

/**
 * @class OperatingSystemSettingProxy
 */
var OperatingSystemSettingProxy = exports.OperatingSystemSettingProxy = function OperatingSystemSettingProxy () {};


OperatingSystemSettingProxy.createFromOperatingSystemSetting = function (_operatingSystemSetting) {
    if (_operatingSystemSetting instanceof OperatingSystemSetting) {
        var operatingSystemSettingProxy = new OperatingSystemSettingProxy();

        operatingSystemSettingProxy._autotuneEnabled = _operatingSystemSetting.isAutotuneEnabled;
        operatingSystemSettingProxy._consoleCLIEnabled = _operatingSystemSetting.isConsoleCLIEnabled;
        operatingSystemSettingProxy._powerdEnabled = _operatingSystemSetting.isPowerdEnabled;
        operatingSystemSettingProxy._autoUploadCrashEnabled = _operatingSystemSetting.isAutoUploadCrashEnabled;
        operatingSystemSettingProxy._swapOnDrive = _operatingSystemSetting.swapOnDrive;

        return operatingSystemSettingProxy;
    }
};


OperatingSystemSettingProxy.prototype = new AbstractProxy();
OperatingSystemSettingProxy.prototype._autotuneEnabled = false;
OperatingSystemSettingProxy.prototype._consoleCLIEnabled = false;
OperatingSystemSettingProxy.prototype._powerdEnabled = false;
OperatingSystemSettingProxy.prototype._autoUploadCrashEnabled = false;
OperatingSystemSettingProxy.prototype._swapOnDrive = null;


Object.defineProperties(OperatingSystemSettingProxy.prototype, {

    isAutotuneEnabled: {
        set: function (_autotuneEnabled) {
            this._updateValue(OperatingSystemSetting.prototype, "isAutotuneEnabled", _autotuneEnabled);
        },
        get: function () {
            return this._autotuneEnabled;
        },
        configurable: true
    },

    isConsoleCLIEnabled: {
        set: function (_consoleCLIEnabled) {
            this._updateValue(OperatingSystemSetting.prototype, "isConsoleCLIEnabled", _consoleCLIEnabled);
        },
        get: function () {
            return this._consoleCLIEnabled;
        },
        configurable: true
    },

    isPowerdEnabled: {
        set: function (_powerdEnabled) {
            this._updateValue(OperatingSystemSetting.prototype, "isPowerdEnabled", _powerdEnabled);
        },
        get: function () {
            return this._powerdEnabled;
        },
        configurable: true
    },

    isAutoUploadCrashEnabled: {
        set: function (_autoUploadCrashEnabled) {
            this._updateValue(OperatingSystemSetting.prototype, "isAutoUploadCrashEnabled", _autoUploadCrashEnabled);
        },
        get: function () {
            return this._autoUploadCrashEnabled;
        },
        configurable: true
    },

    swapOnDrive: {
        set: function (_swapOnDrive) {
            this._updateValue(OperatingSystemSetting.prototype, "swapOnDrive", _swapOnDrive);
        },
        get: function () {
            return this._swapOnDrive;
        },
        configurable: true
    }

});

OperatingSystemSettingProxy.prototype.checkValidity = function (key) {
    if (key === "swapOnDrive") {
        this.validity.isSwapOnDriveValid = this._swapOnDrive ? !isNaN(this._swapOnDrive) : true;
    }

    return typeof this.validity.isSwapOnDriveValid === "boolean" ? this.validity.isSwapOnDriveValid : true;
};


OperatingSystemSettingProxy.prototype.toRawObject = function () {
    return {
        autotune: this._autotuneEnabled,
        console_cli: this._consoleCLIEnabled,
        powerd: this._powerdEnabled,
        uploadcrash: this._autoUploadCrashEnabled,
        swapondrive: this._swapOnDrive
    };
};
