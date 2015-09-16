var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel;


/**
 * @class SystemSetting
 */
var SystemSetting = exports.SystemSetting = function SystemSetting () {};


SystemSetting._type = null;


Object.defineProperty(SystemSetting, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "SystemSetting";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


SystemSetting.prototype = new AbstractModel();
SystemSetting.prototype._managementConnectionSetting = null;
SystemSetting.prototype._operatingSystemSetting = null;
SystemSetting.prototype._consoleSetting = null;


Object.defineProperties(SystemSetting.prototype, {

    managementConnectionSetting: {
        set: function (_managementConnectionSetting) {
            if (_managementConnectionSetting instanceof ManagementConnectionSetting) {
                this._managementConnectionSetting = _managementConnectionSetting;
            }
        },
        get: function () {
            return this._managementConnectionSetting;
        }
    },

    consoleSetting: {
        set: function (_consoleSetting) {
            if (_consoleSetting instanceof ConsoleSetting) {
                this._consoleSetting = _consoleSetting;
            }
        },
        get: function () {
            return this._consoleSetting;
        }
    },

    operatingSystemSetting: {
        set: function (_operatingSystemSetting) {
            if (_operatingSystemSetting instanceof OperatingSystemSetting) {
                this._operatingSystemSetting = _operatingSystemSetting;
            }
        },
        get: function () {
            return this._operatingSystemSetting;
        }
    }

});

SystemSetting.prototype.updateConsoleSetting = function (_consoleSettingProxy) {
    //fixme: temporary logic
    if (this.consoleSetting) {
        this.consoleSetting._serialConsoleEnabled = _consoleSettingProxy._serialConsoleEnabled;
        this.consoleSetting._consoleScreenSaverEnabled = _consoleSettingProxy._consoleScreenSaverEnabled;
        this.consoleSetting._serialPort = _consoleSettingProxy._serialPort;
        this.consoleSetting._serialSpeed = _consoleSettingProxy._serialSpeed;
    }
};

SystemSetting.prototype.updateOperatingSystemSetting = function (_operatingSystemSettingProxy) {
    //fixme: temporary logic
    if (this.consoleSetting) {
        this.operatingSystemSetting._autotuneEnabled = _operatingSystemSettingProxy._autotuneEnabled;
        this.operatingSystemSetting._consoleCLIEnabled = _operatingSystemSettingProxy._consoleCLIEnabled;
        this.operatingSystemSetting._powerdEnabled = _operatingSystemSettingProxy._powerdEnabled;
        this.operatingSystemSetting._autoUploadCrashEnabled = _operatingSystemSettingProxy._autoUploadCrashEnabled;
        this.operatingSystemSetting._swapOnDrive = _operatingSystemSettingProxy._swapOnDrive;
    }
};


/**
 * @class OperatingSystemSetting
 */
var OperatingSystemSetting = exports.OperatingSystemSetting = function OperatingSystemSetting () {};


OperatingSystemSetting.prototype._autotuneEnabled = false;
OperatingSystemSetting.prototype._consoleCLIEnabled = false;
OperatingSystemSetting.prototype._powerdEnabled = false;
OperatingSystemSetting.prototype._autoUploadCrashEnabled = false;
OperatingSystemSetting.prototype._swapOnDrive = null;

//fixme: temporary logic
Object.defineProperties(OperatingSystemSetting.prototype, {

    isAutotuneEnabled: {
        set: function (_autotuneEnabled) {
            _autotuneEnabled = !!_autotuneEnabled;

            if (_autotuneEnabled !== this._autotuneEnabled) {
                this._autotuneEnabled = _autotuneEnabled;
            }
        },
        get: function () {
            return this._autotuneEnabled;
        }
    },

    isConsoleCLIEnabled: {
        set: function (_consoleCLIEnabled) {
            _consoleCLIEnabled = !!_consoleCLIEnabled;

            if (_consoleCLIEnabled !== this._consoleCLIEnabled) {
                this._consoleCLIEnabled = _consoleCLIEnabled;
            }
        },
        get: function () {
            return this._consoleCLIEnabled;
        }
    },

    isPowerdEnabled: {
        set: function (_powerdEnabled) {
            _powerdEnabled = !!_powerdEnabled;

            if (_powerdEnabled !== this._powerdEnabled) {
                this._powerdEnabled = _powerdEnabled;
            }
        },
        get: function () {
            return this._powerdEnabled;
        }
    },

    isAutoUploadCrashEnabled: {
        set: function (_autoUploadCrashEnabled) {
            _autoUploadCrashEnabled = !!_autoUploadCrashEnabled;

            if (_autoUploadCrashEnabled !== this._autoUploadCrashEnabled) {
                this._autoUploadCrashEnabled = _autoUploadCrashEnabled;
            }
        },
        get: function () {
            return this._autoUploadCrashEnabled;
        }
    },

    swapOnDrive: {
        set: function (_swapOnDrive) {
            if (this._swapOnDrive !== _swapOnDrive) {
                this._swapOnDrive = _swapOnDrive || null;
            }
        },
        get: function () {
            return this._swapOnDrive;
        }
    }

});


/**
 * @class ConsoleSetting
 */
var ConsoleSetting = exports.ConsoleSetting = function ConsoleSetting () {};


ConsoleSetting.prototype._serialConsoleEnabled = false;
ConsoleSetting.prototype._consoleScreenSaverEnabled = false;
ConsoleSetting.prototype._serialPort = null;
ConsoleSetting.prototype._serialSpeed = null;


Object.defineProperties(ConsoleSetting.prototype, {

    isSerialConsoleEnabled: {
        set: function (_serialConsoleEnabled) {
            _serialConsoleEnabled = !!_serialConsoleEnabled;

            if (_serialConsoleEnabled !== this._serialConsoleEnabled) {
                this._serialConsoleEnabled = _serialConsoleEnabled;
            }
        },
        get: function () {
            return this._serialConsoleEnabled;
        }
    },

    isConsoleScreenSaverEnabled: {
        set: function (_consoleScreenSaverEnabled) {
            _consoleScreenSaverEnabled = !!_consoleScreenSaverEnabled;

            if (_consoleScreenSaverEnabled !== this._consoleScreenSaverEnabled) {
                this._consoleScreenSaverEnabled = _consoleScreenSaverEnabled;
            }
        },
        get: function () {
            return this._consoleScreenSaverEnabled;
        }
    },

    serialPort: {
        set: function (_serialPort) {
            _serialPort = +_serialPort;

            if (!isNaN(_serialPort) && this._serialPort !== _serialPort) {
                this._serialPort = _serialPort;
            }
        },
        get: function () {
            return this._serialPort;
        }
    },

    serialSpeed: {
        set: function (_serialSpeed) {
            _serialSpeed = +_serialSpeed;

            if (!isNaN(_serialSpeed) && this._serialSpeed !== _serialSpeed) {
                this._serialSpeed = _serialSpeed;
            }
        },
        get: function () {
            return this._serialSpeed;
        }
    }

});


/**
 * @class ManagementConnectionSetting
 */
var ManagementConnectionSetting = exports.ManagementConnectionSetting = function ManagementConnectionSetting () {};


ManagementConnectionSetting.prototype._httpPort = null;
ManagementConnectionSetting.prototype._httpsPort = null;
ManagementConnectionSetting.prototype._redirectHypertextTransferProtocols = false;
ManagementConnectionSetting.prototype._currentHypertextTransferProtocol = null;
ManagementConnectionSetting.prototype.httpsCertificate = null; //fixme: need investigating -> type?


Object.defineProperties(ManagementConnectionSetting.prototype, {

    httpPort: {
        set: function (_httpPort) {
            if (this._httpPort !== _httpPort) {
                this._httpPort = _httpPort || null;
            }
        },
        get: function () {
            return this._httpPort;
        }
    },

    httpsPort: {
        set: function (_httpsPort) {
            if (this._httpsPort !== _httpsPort) {
                this._httpsPort = _httpsPort || null;
            }
        },
        get: function () {
            return this._httpsPort;
        }
    },

    isRedirectHypertextTransferProtocols: {
        set: function (_redirectHypertextTransferProtocols) {
            _redirectHypertextTransferProtocols = !!_redirectHypertextTransferProtocols;

            if (_redirectHypertextTransferProtocols !== this._redirectHypertextTransferProtocols) {
                this._redirectHypertextTransferProtocols = _redirectHypertextTransferProtocols;
            }
        },
        get: function () {
            return this._redirectHypertextTransferProtocols;
        }
    },

    currentHypertextTransferProtocol: {
        set: function (_currentHypertextTransferProtocol) {
            if (typeof _currentHypertextTransferProtocol === "string" && _currentHypertextTransferProtocol !== this._currentHypertextTransferProtocol) {
                this._currentHypertextTransferProtocol = _currentHypertextTransferProtocol;
            }
        },
        get: function () {
            return this._currentHypertextTransferProtocol;
        }
    }

});
