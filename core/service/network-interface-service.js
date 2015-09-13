var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    NetworkInterfaceMapping = require("core/mapping/network-interface-mapping").NetworkInterfaceMapping,
    MessageCommand = require("core/backend/message-command").MessageCommand;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.NetworkInterfaceService = AbstractDataService.specialize(/** @lends NetworkInterfaceService# */{

    mapping: {
        value: new NetworkInterfaceMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "network.interfaces.query",
                    args: []
                });

            this._backend.send(messageCommand).then(function (response) {
                if (response && response.data && response.data.constructor === Array) {
                    self.addRawData(stream, response.data);
                }

                self.rawDataDone(stream);
            });
        }
    }

});
