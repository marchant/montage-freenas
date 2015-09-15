var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel;

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
Disk.prototype._path = null;
Disk.prototype._online = true;
Disk.prototype._description = null;
Disk.prototype._partitions = null;


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

    size: {
        set: function (_size) {
            _size = +_size;

            if (!isNaN(_size) && this._size !== _size) {
                this._size = _size;
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
    }


});
