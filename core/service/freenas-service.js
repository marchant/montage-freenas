var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    UserService = require("core/service/user-service").UserService,
    User = require("core/model/user").User;

/**
 * The interface to all services used by Montage-FreeNas.
 *
 * @class
 * @extends external:AbstractDataService
 */
exports.FreeNasService = AbstractDataService.specialize(/** @lends FreeNasService# */{

    initWithBackendBridge: {
        value: function (_backendBridge) {
            AbstractDataService.prototype.initWithBackendBridge.call(_backendBridge);

            this.childServices.set(User.TYPE, new UserService().initWithBackendBridge(_backendBridge));

            return this;
        }
    }

});