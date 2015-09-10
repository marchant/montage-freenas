var DataStream = require("montage-data/logic/service/data-stream").DataStream,
    Group = require("core/model/group").Group;


exports.GroupController = {

    getGroupList: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(Group.TYPE, _dataSource);
        }
    }

};
