var ManagementConnectionSettingProxy = require("core/proxy/management-connection-setting-proxy").ManagementConnectionSettingProxy,
    OperatingSystemSettingProxy = require("core/proxy/operating-system-setting-proxy").OperatingSystemSettingProxy,
    ConsoleSettingProxy = require("core/proxy/console-setting-proxy").ConsoleSettingProxy,
    SystemInfoProxy = require("core/proxy/system-info-proxy").SystemInfoProxy,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    SystemSetting = require("core/model/system-setting").SystemSetting,
    System = require("core/model/system").System;


exports.SystemController = {

    getSystemInfo: {
        value: function () {
            return this._store.getModelObjectList(System.TYPE).then(function (_data) {
                return _data && _data.constructor === Array && _data.length ? _data[0] : null;
            });
        }
    },

    getSystemInfoProxy: {
        value: function () {
            return this.getSystemInfo().then(function (_systemInfo) {
                return _systemInfo ? new SystemInfoProxy(_systemInfo.hostname) : null;
            });
        }
    },

    updateSystemInfo: {
        value: function (_systemInfoProxy) {
            if (_systemInfoProxy instanceof SystemInfoProxy) {
                var self = this;

                var messageCommand = new MessageCommand("rpc", "call", {
                    method: "task.submit",
                    args: ["system.general.configure", [_systemInfoProxy.toRawObject()]]
                });

                //fixme: seems to break the server.
                //return this._backend.send(messageCommand).then((function (response) {
                //    debugger
                //}));
            }

            return Promise.reject("wrong parameters given");
        }
    },

    updateConsoleSetting: {
        value: function (_consoleSettingInfoProxy) {
            if (_consoleSettingInfoProxy instanceof ConsoleSettingProxy) {
                var self = this;

                var messageCommand = new MessageCommand("rpc", "call", {
                    method: "task.submit",
                    args: ["system.advanced.configure", [_consoleSettingInfoProxy.toRawObject()]]
                });

                return this._backend.send(messageCommand).then((function (response) {
                    //todo need investigating -> subscribe to task events?
                }));
            }

            return Promise.reject("wrong parameters given");
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

    getConsoleConfigProxy: {
        value: function () {
            var self = this;

            return this._getSystemSetting().then(function (_systemSetting) {
                return self._getConsoleSettingProxy(_systemSetting.consoleSetting);
            });
        }
    },

    getOperatingSystemConfigProxy: {
        value: function () {
            var self = this;

            return this._getSystemSetting().then(function (_systemSetting) {
                return self._getOperatingSystemSettingProxy(_systemSetting.operatingSystemSetting);
            });
        }
    },

   getManagementConnectionSettingProxy: {
        value: function () {
            var self = this;

            return this._getSystemSetting().then(function (_systemSetting) {
                return self._getManagementConnectionSettingProxy(_systemSetting.managementConnectionSetting);
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
