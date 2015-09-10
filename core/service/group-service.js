var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    GroupMapping = require("core/mapping/group-mapping").GroupMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.GroupService = AbstractDataService.specialize(/** @lends UserService# */{

    mapping: {
        value: new GroupMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "groups.query",
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
