var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    SystemSettingMapping = require("core/mapping/system-setting-mapping").SystemSettingMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.SystemSettingService = AbstractDataService.specialize(/** @lends SystemSettingService# */{

    mapping: {
        value: new SystemSettingMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this;

            Promise.all([
                this._fetchAdvancedSetting(),
                this._fetchManagementConnection()

            ]).then(function (responses) {
                if (responses && responses.constructor === Array && responses.length === 2) {
                    var advancedSetting = responses[0],
                        managementConnection =  responses[1];

                    self.addRawData(stream, [{
                        advancedSetting: advancedSetting && advancedSetting.data ? advancedSetting.data : null,

                        managementConnection: managementConnection && managementConnection.data ? managementConnection.data : null
                    }]);
                }

                self.rawDataDone(stream);
            });
        }
    },


    _fetchAdvancedSetting: {
        value: function () {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "system.advanced.get_config",
                    args: []
                });

            return this._backend.send(messageCommand);
        }
    },

    _fetchManagementConnection: {
        value: function () {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "system.ui.get_config",
                    args: []
                });

            return this._backend.send(messageCommand);
        }
    }

});
