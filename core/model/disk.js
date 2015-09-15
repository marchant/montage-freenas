var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel,
    ByteCalc = require("core/utility/ByteCalc");

/**
 * @class Disk
 */
var Disk = exports.Disk = function Disk () {};

Disk._type = null;

Object.defineProperty(Disk, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "Disk";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


Disk.prototype= new AbstractModel();

Disk.prototype._size = 0;
Disk.prototype.humanReadableSize = 0;
Disk.prototype._path = null;
Disk.prototype._online = true;
Disk.prototype._description = null;
Disk.prototype._partitions = null;
Disk.prototype._manufacturer = null;
Disk.prototype._maxRotation = null;
Disk.prototype._isSSD = false;


Object.defineProperties(Disk.prototype, {

    description: {
        set: function (_description) {
            if (typeof _description === "string" && this._description !== _description) {
                this._description = _description;
            }
        },
        get: function () {
            return this._description;
        }
    },

    isOnline: {
        set: function (_online) {
            _online = !!_online;

            if (this._online !== _online) {
                this._online = _online;
            }
        },
        get: function () {
            return this._online;
        }
    },

    isSSD: {
        set: function (_isSSD) {
            _isSSD = !!_isSSD;

            if (this._isSSD !== _isSSD) {
                this._isSSD = _isSSD;
            }
        },
        get: function () {
            return this._isSSD;
        }
    },

    partitions: {
        set: function (_partitions) {
            if (_partitions && _partitions.constructor === Array) {
                this._partitions = _partitions;
            }
        },
        get: function () {
            if (!this._partitions) {
                this._partitions = [];
            }

            return this._partitions;
        }
    },

    manufacturer: {
        set: function (_manufacturer) {
            if (typeof _manufacturer === "string" && this._manufacturer !== _manufacturer) {
                this._description = _manufacturer;
            }
        },
        get: function () {
            if (!this._manufacturer) {
                // fixme: demo purpose
                this._manufacturer = "VMware Disk";
            }

            return this._manufacturer;
        }
    },

    maxRotation: {
        set: function (_maxRotation) {
            //fixme: need investigating -> number? string?
            if (!this.isSSD && this._maxRotation !== _maxRotation) {
                this._maxRotation = _maxRotation;
            }
        },
        get: function () {
            return this._maxRotation;
        }
    },

    label: {
        get: function () {
            return (this.manufacturer || "") + " " + this.humanReadableSize + " " + (this.isSSD ? "" : this.maxRotation + "rpm");
        }
    }

});


var CommonDiskObjectDescriptor = {

    size: {
        set: function (_size) {
            _size = +_size;

            if (!isNaN(_size) && this._size !== _size) {
                this._size = _size;
                this.humanReadableSize = ByteCalc.humanize(_size, {roundMode: "whole"});
            }
        },
        get: function () {
            return this._size;
        }
    },

    path: {
        set: function (_path) {
            if (typeof _path === "string" && this._path !== _path) {
                this._path = _path;
            }
        },
        get: function () {
            return this._path;
        }
    }
};


Object.defineProperties(Disk.prototype, CommonDiskObjectDescriptor);


/**
 * @class DiskPartition
 */
var DiskPartition = exports.DiskPartition = function DiskPartition () {};


DiskPartition.prototype._size = 0;
DiskPartition.prototype.humanReadableSize = 0;
DiskPartition.prototype._path = null;

Object.defineProperties(DiskPartition.prototype, CommonDiskObjectDescriptor);
