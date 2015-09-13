var AbstractStore = require("core/store/abstract-store").AbstractStore;


var NetworkSettingStore = exports.NetworkSettingStore = function NetworkSettingStore (_collection) {
    AbstractStore.call(this, _collection);
};

NetworkSettingStore.prototype = new AbstractStore();
