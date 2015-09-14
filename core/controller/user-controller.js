var User = require("core/model/user").User;


exports.UserController = {

    getUserList: {
        value: function () {
            return this._store.getModelObjectList(User.TYPE);
        }
    }

};
