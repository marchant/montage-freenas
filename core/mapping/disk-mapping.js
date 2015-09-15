var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    DiskModel = require("core/model/disk"),
    DiskPartition = DiskModel.DiskPartition,
    Disk = DiskModel.Disk;

exports.DiskMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var disk = new Disk();

            disk.size = rawObject.mediasize;
            disk.path = rawObject.path;
            disk.isOnline = rawObject.online;

            if (rawObject.status) {
                disk.description = rawObject.status.description;

                var partitions = rawObject.status.partitions,
                    diskPartitions = [],
                    diskPartition,
                    partition;

                if (partitions && partitions.constructor) {
                    for (var i = 0, length = partitions.length; i < length; i++) {
                        partition = partitions[i];

                        if (partition) {
                            diskPartition = new DiskPartition();

                            diskPartition.size = partition.mediasize;
                            diskPartition.path = partition.paths[0]; //fixme: need investigating.

                            diskPartitions.push(diskPartition);
                        }
                    }

                    disk.partitions = diskPartitions;
                }
            }

            return disk;
        }
    }
});
