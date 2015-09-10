var DataStream = require("montage-data/logic/service/data-stream").DataStream,
    User = require("core/model/user").User;


exports.UserController = {

    getUserList: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(User.TYPE, _dataSource);
        }
    }

};
