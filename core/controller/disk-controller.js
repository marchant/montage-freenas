var Disk = require("core/model/disk").Disk;


exports.DiskController = {

    getDiskList: {
        value: function () {
            return this._store.getModelObjectList(Disk.TYPE);
        }
    },

    getSimilarDiskList: {
        value: function () {
            return this.getDiskList().then(function (_disks) {
                var groupedDisks = null;

                if (_disks && _disks.length) {
                    var disk, i, length,
                        groupedDisksMap = {};

                    for (i = 0, length = _disks.length; i < length; i++) {
                        disk = _disks[i];

                        if (!groupedDisksMap[disk.label]) {
                            groupedDisksMap[disk.label] = [];
                        }

                        groupedDisksMap[disk.label].push(disk);
                    }

                    var groupedDisksMapKeys = Object.keys(groupedDisksMap),
                        groupedDisksMapKey;

                    if (groupedDisksMapKeys.length) {
                        groupedDisks = [];

                        for (i = 0, length = groupedDisksMapKeys.length; i < length; i++) {
                            groupedDisksMapKey = groupedDisksMapKeys[i];

                            groupedDisks.push({
                                label: groupedDisksMapKey,
                                disks: groupedDisksMap[groupedDisksMapKey]
                            });
                        }
                    }
                }

                return groupedDisks;
            });
        }
    }

};
