var AbstractStore = require("core/store/abstract-store").AbstractStore;


var SystemStore = exports.SystemStore = function SystemStore (_collection) {
    AbstractStore.call(this, _collection);
};

SystemStore.prototype = new AbstractStore();
