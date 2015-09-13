var AbstractStore = require("core/store/abstract-store").AbstractStore;


var UserStore = exports.UserStore = function UserStore (_collection) {
    AbstractStore.call(this, _collection);
};

UserStore.prototype = new AbstractStore();
