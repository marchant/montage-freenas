var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    UserMapping = require("core/mapping/user-mapping").UserMapping;

/**
 * @class
 * @extends external:AbstractDataService
 */
exports.UserService = AbstractDataService.specialize(/** @lends UserService# */{

    mapping: {
        value: new UserMapping()
    },

    getRawData: {
        value: function (stream) {
            var self = this,

                messageCommand = new MessageCommand("rpc", "call", {
                    method: "users.query",
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
