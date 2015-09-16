var ManagementConnectionSettingProxy = require("core/proxy/management-connection-setting-proxy").ManagementConnectionSettingProxy,
    OperatingSystemSettingProxy = require("core/proxy/operating-system-setting-proxy").OperatingSystemSettingProxy,
    ConsoleSettingProxy = require("core/proxy/console-setting-proxy").ConsoleSettingProxy,
    SystemSetting = require("core/model/system-setting").SystemSetting,
    System = require("core/model/system").System;


exports.SystemController = {

    getSystemInfo: {
        value: function () {
            return this._store.getModelObjectList(System.TYPE).then(function (data) {
                return data[0];
            });
        }
    },

    getSystemSetting: {
        value: function () {
            var self = this;

            return this._getSystemSetting().then(function (_systemSetting) {
                return {
                    managementConnectionSettingProxy: self._getManagementConnectionSettingProxy(_systemSetting.managementConnectionSetting),
                    operatingSystemSettingProxy: self._getOperatingSystemSettingProxy(_systemSetting.operatingSystemSetting),
                    consoleSettingProxy: self._getConsoleSettingProxy(_systemSetting.consoleSetting)
                };
            });
        }
    },

    getConsoleConfig: {
        value: function () {
            this.getSystemSetting().then(function (_systemSetting) {
                return this._getConsoleSettingProxy(_systemSetting.consoleSetting);
            });
        }
    },

    getOperatingSystemConfig: {
        value: function () {
            this.getSystemSetting().then(function (_systemSetting) {
                return this._getOperatingSystemSettingProxy(_systemSetting.operatingSystemSetting);
            });
        }
    },

   getManagementConnectionSetting: {
        value: function () {
            this.getSystemSetting().then(function (_systemSetting) {
                return this._getManagementConnectionSettingProxy(_systemSetting.managementConnectionSetting);
            });
        }
    },

    getLocalizationConfig: {
        value: function () {
            //todo
        }
    },

    _getOperatingSystemSettingProxy: {
        value: function (_operatingSystemSetting) {
            return OperatingSystemSettingProxy.createFromOperatingSystemSetting(_operatingSystemSetting);
        }
    },

    _getConsoleSettingProxy: {
        value: function (_consoleSetting) {
            return ConsoleSettingProxy.createFromConsoleSetting(_consoleSetting);
        }
    },

    _getManagementConnectionSettingProxy: {
        value: function (_managementConnectionSetting) {
            return ManagementConnectionSettingProxy.createFromManagementConnectionSetting(_managementConnectionSetting);
        }
    },


    _getSystemSetting: {
        value: function () {
            return this._store.getModelObjectList(SystemSetting.TYPE).then(function (_data) {
                return _data[0];
            });
        }
    }

};
