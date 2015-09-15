var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    Disk = require("core/model/disk").Disk;

exports.DiskMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var group = new Disk();

            group.size = rawObject.mediasize;
            group.path = rawObject.path;
            group.isOnline = rawObject.online;

            if (rawObject.status) {
                group.description = rawObject.status.description;
                group.partitions = rawObject.status.partitions;

                group.partitions = [ //dummy data
                    {
                        "size": 16,
                        "path": "/dev/da20"
                    },
                    {
                        "size": 8,
                        "path": "/dev/da20"
                    },
                    {
                        "size": 8,
                        "path": "/dev/da20"
                    }
                ]
            }

            return group;
        }
    }
});
