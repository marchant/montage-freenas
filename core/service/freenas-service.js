var AbstractDataService = require("core/service/abstract-data-service").AbstractDataService,
    UserService = require("core/service/user-service").UserService,
    GroupService = require("core/service/group-service").GroupService,
    SystemService = require("core/service/system-service").SystemService,
    NetworkSettingService = require("core/service/network-setting-service").NetworkSettingService,
    Group = require("core/model/group").Group,
    NetworkSetting = require("core/model/network-setting").NetworkSetting,
    System = require("core/model/system").System,
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
            this.childServices.set(Group.TYPE, new GroupService().initWithBackendBridge(_backendBridge));
            this.childServices.set(System.TYPE, new SystemService().initWithBackendBridge(_backendBridge));
            this.childServices.set(NetworkSetting.TYPE, new NetworkSettingService().initWithBackendBridge(_backendBridge));

            return this;
        }
    }

});