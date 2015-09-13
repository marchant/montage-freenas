var AbstractStore = require("core/store/abstract-store").AbstractStore;


var GroupStore = exports.GroupStore = function GroupStore (_collection) {
    AbstractStore.call(this, _collection);
};

GroupStore.prototype = new AbstractStore();
