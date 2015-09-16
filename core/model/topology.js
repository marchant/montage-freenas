var Montage = require("montage/core/core").Montage;

exports.Topology = Montage.specialize({

    constructor: {
        value: function () {
            this.super();
            this._initTopology();
        }
    },

    _cloneAvailableDisks: {
        value: function () {
            return JSON.parse(JSON.stringify(this._dummyAvailableDisks));
        }
    },

    _initTopology: {
        value: function () {
            var i, j;

            this.cache = [];
            this.log = [];
            this.storage = [[]];
            this.storageType = [];
            this.spares = [];
            this.availableDisks = this._cloneAvailableDisks();
            for (i = 0; i < this.availableDisks.ssds.length; i++) {
                for (j = 0; j < this.availableDisks.ssds[i].disks.length; j++) {
                    this.availableDisks.ssds[i].disks[j].origin = this.availableDisks.ssds[i].disks;
                }
            }
            for (i = 0; i < this.availableDisks.hdds.length; i++) {
                for (j = 0; j < this.availableDisks.hdds[i].disks.length; j++) {
                    this.availableDisks.hdds[i].disks[j].origin = this.availableDisks.hdds[i].disks;
                }
            }
        }
    },

    reset: {
        value: function () {
            this._initTopology();
        }
    },

    _flattenDiskGroup: {
        value: function (group, originGroup) {
            var flattenedDisks = [],
                origin,
                disks,
                i, j;

            for (i = 0; i < group.length; i++) {
                disks = group[i].disks;
                origin = originGroup[i].disks;
                for (j = 0; j < disks.length; j++) {
                    disks[j].origin = origin;
                    flattenedDisks.push({
                        disk: disks[j],
                        group: disks
                    });
                }
            }
            return flattenedDisks;
        }
    },

    _calculatePreferences: {
        value: function (safety, speed, storage) {
            var layouts = [
                    ["raidz2", "raidz1", "mirror"],
                    ["mirror", "raidz1", "raidz1"],
                    ["raidz1", "raidz1", "raidz1"]
                ],
                preferences = {
                    highest: 0,
                    priority: null,
                    desired: null
                },
                votes = {
                    mirror: 0,
                    raidz1: 0,
                    raidz2: 0
                };

            function addVotes(scalar, index) {
                var victor;

                if (scalar < .33) {
                    victor = layouts[index][2];
                } else if (scalar < .66) {
                    victor = layouts[index][1];
                } else {
                    victor = layouts[index][0];
                }
                if (scalar > preferences.highest) {
                    preferences.highest = scalar;
                    preferences.priority = ["safety", "speed", "storage"][index];
                }
                votes[victor] += scalar;
            }
            [safety, speed, storage].forEach(addVotes);
            preferences.desired = Object.keys(votes).sort((a, b) => votes[b] - votes[a]);
            return preferences;
        }
    },

    _diskChunks: {
        value: {
            mirror: {
                speed: 2,
                safety: 2,
                storage: 2
            },
            raidz1: {
                speed: 3,
                safety: 5,
                storage: 7
            },
            raidz2: {
                speed: 4,
                safety: 5,
                storage: 6
            }
        }
    },

    createTopology: {
        value: function (preferences) {
            var availableDisks = this._cloneAvailableDisks(),
                availableHdds,
                availableSsds,
                ssdSplit,
                desired,
                chunkSize,
                totalMoved,
                storageType = [],
                chunks,
                disks,
                length,
                index,
                i, j;

            availableHdds = this._flattenDiskGroup(availableDisks.hdds, this.availableDisks.hdds);
            availableSsds = this._flattenDiskGroup(availableDisks.ssds, this.availableDisks.ssds);
            ssdSplit = availableSsds.length >> 1;
            disks = [];
            for (i = 0; i < ssdSplit; i++) {
                disks.push(availableSsds[i].disk);
            }
            this.cache.swap(0, Infinity, disks);
            disks = [];
            for (i = ssdSplit; i < availableSsds.length; i++) {
                disks.push(availableSsds[i].disk);
            }
            this.log.swap(0, Infinity, disks);
            desired = preferences.desired[0].toLowerCase();
            chunkSize = this._diskChunks[desired][preferences.priority.toLowerCase()];
            chunks = Math.floor(availableHdds.length / chunkSize);
            totalMoved = chunkSize * chunks;
            this.storage.splice(chunks + 1, Infinity);
            for (i = 0; i < chunks; i++) {
                disks = [];
                for (j = 0; j < chunkSize; j++) {
                    index = i * chunkSize + j;
                    disks.push(availableHdds[index].disk);
                    availableHdds[index].group.splice(
                        availableHdds[index].group.indexOf(availableHdds[index].disk),
                        1
                    );
                }
                if (this.storage[i]) {
                    this.storage[i].swap(0, Infinity, disks);
                } else {
                    this.storage.set(i, disks);
                }
                storageType.push(desired);
            }
            if (this.storage[chunks]) {
                this.storage[chunks].swap(0, Infinity);
            } else {
                this.storage.set(i, []);
            }
            this.storageType.swap(0, Infinity, storageType);
            for (i = 0; i < this.availableDisks.ssds.length; i++) {
                this.availableDisks.ssds[i].disks.splice(0, Infinity);
            }
            for (i = 0; i < availableDisks.hdds.length; i++) {
                this.availableDisks.hdds[i].disks.swap(0, Infinity, availableDisks.hdds[i].disks);
            }
        }
    },

    _dummyAvailableDisks: {
        value: {
            ssds: [
                {
                    group: "Samsung 16 GB",
                    disks: [
                        {
                            group: "Samsung 16 GB",
                            type: "ssd",
                            smartStatus: "PASS",
                            capacity: 16000000000,
                            name: "/dev/da20"
                        },
                        {
                            group: "Samsung 16 GB",
                            type: "ssd",
                            smartStatus: "PASS",
                            capacity: 16000000000,
                            name: "/dev/da21"
                        }
                    ]
                },
                {
                    group: "OCZ 8 GB",
                    disks: [
                        {
                            group: "OCZ 8 GB",
                            type: "ssd",
                            smartStatus: "PASS",
                            capacity: 8000000000,
                            name: "/dev/da22"
                        },
                        {
                            group: "OCZ 8 GB",
                            type: "ssd",
                            smartStatus: "PASS",
                            capacity: 8000000000,
                            name: "/dev/da23"
                        }
                    ]
                }
            ],
            hdds: [
                {
                    group: "Western Digital 4 TB 5400rpm",
                    disks: [
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da0"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da1"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da10"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da11"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da12"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da13"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da14"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da15"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da16"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da17"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da18"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da19"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da2"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da3"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da4"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da5"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da6"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da7"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da8"
                        },
                        {
                            group: "Western Digital 4 TB 5400rpm",
                            type: "hdd",
                            smartStatus: "PASS",
                            capacity: 4000000000000,
                            name: "/dev/da9"
                        }
                    ]
                }
            ]
        }
    }

});
