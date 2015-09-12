var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    NetworkSettingMapping = require("core/mapping/network-setting-mapping").NetworkSettingMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.NetworkSettingService = AbstractDataService.specialize(/** @lends NetworkSettingService# */{

    mapping: {
        value: new NetworkSettingMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "network.config.get_global_config",
                    args: []
                });

            this._backend.send(messageCommand).then(function (response) {
                if (response && response.data) {
                    self.addRawData(stream, [response.data]);
                }

                self.rawDataDone(stream);
            });
        }
    }

});
