var Disk = require("core/model/disk").Disk;


exports.DiskController = {

    getDiskList: {
        value: function () {
            return this._store.getModelObjectList(Disk.TYPE);
        }
    }

};
