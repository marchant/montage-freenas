var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    SystemMapping = require("core/mapping/system-mapping").SystemMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.SystemService = AbstractDataService.specialize(/** @lends UserService# */{

    mapping: {
        value: new SystemMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this;

            Promise.all([
                this._getSystemHardwareInfo(),
                this._getSystemGeneralConfig()

            ]).then(function (responses) {
                if (responses && responses.constructor === Array && responses.length === 2) {
                    var hardwareInfo = responses[0],
                        generalConfig =  responses[1];

                    self.addRawData(stream, [{
                        hardwareInfo: hardwareInfo && hardwareInfo.data ? hardwareInfo.data : null,

                        generalConfig: generalConfig && generalConfig.data ? generalConfig.data : null
                    }]);
                }

                self.rawDataDone(stream);
            });
        }
    },

    _getSystemHardwareInfo: {
        value: function () {
            var messageCommand = new MessageCommand("rpc", "call", {
                method: "system.info.hardware",
                args: []
            });

            return this._backend.send(messageCommand);
        }
    },

    _getSystemGeneralConfig: {
        value: function () {
            var messageCommand = new MessageCommand("rpc", "call", {
                method: "system.general.get_config",
                args: []
            });

            return this._backend.send(messageCommand);
        }
    }

});
