var AbstractStore = require("core/store/abstract-store").AbstractStore;


var DiskStore = exports.DiskStore = function DiskStore (_collection) {
    AbstractStore.call(this, _collection);
};

DiskStore.prototype = new AbstractStore();
