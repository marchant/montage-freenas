var AbstractStore = require("core/store/abstract-store").AbstractStore;


var SystemSettingStore = exports.SystemSettingStore = function SystemSettingStore (_collection) {
    AbstractStore.call(this, _collection);
};

SystemSettingStore.prototype = new AbstractStore();
