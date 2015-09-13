var Group = require("core/model/group").Group;


exports.GroupController = {

    getGroupList: {
        value: function () {
            return this._store.getModelObjectList(Group.TYPE);
        }
    },

    findGroupWithID: {
        value: function (_groupID) {
            return this._store.findModelObjectWithID(Group.Type, _groupID);
        }
    }

};
