var application  = require("montage/core/application").application;

var AbstractModel = exports.AbstractModel = function AbstractModel () {};

Object.defineProperties(AbstractModel.prototype,  {
    _store: {
        get: function () {
            return application.controller._store;
        }
    }
});
