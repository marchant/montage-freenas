var AbstractStore = require("core/store/abstract-store").AbstractStore;


var NetworkInterfaceStore = exports.NetworkInterfaceStore = function NetworkInterfaceStore (_collection) {
    AbstractStore.call(this, _collection);
};

NetworkInterfaceStore.prototype = new AbstractStore();
