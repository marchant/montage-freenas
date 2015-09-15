var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    DiskMapping = require("core/mapping/disk-mapping").DiskMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.DiskService = AbstractDataService.specialize(/** @lends DiskService# */{

    mapping: {
        value: new DiskMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "disks.query",
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
