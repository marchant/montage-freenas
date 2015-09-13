var System = require("core/model/system").System;


exports.SystemController = {

    getSystemInfo: {
        value: function () {
            return this._store.getModelObjectList(System.TYPE).then(function (data) {
                return data[0];
            });
        }
    }

};
