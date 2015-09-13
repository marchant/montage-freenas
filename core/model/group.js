var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel;

/**
 * @class Group
 */
var Group = exports.Group = function Group () {};

Group._type = null;

Object.defineProperty(Group, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "Group";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


Group.prototype = new AbstractModel();

Group.prototype._name = null;

Group.prototype._builtIn = true;

Group.prototype._created = null;

Group.prototype.members = null;

Group.prototype._id = null;

Group.prototype._sudo = false;

Group.prototype._updated = null;


Object.defineProperties(Group.prototype, {

    name: {
        set: function (_name) {
            if (typeof _name === "string" && _name.length && _name !== this._username) {
                this._name = _name;
            }
        },
        get: function () {
            return this._name;
        },
        configurable: true
    },

    isBuiltIn: {
        set: function (_builtIn) {
            _builtIn = !!_builtIn;

            if (_builtIn !== this._builtIn) {
                this._builtIn = _builtIn;
            }
        },
        get: function () {
            return this._builtIn;
        },
        configurable: true
    },

    dateCreated: {
        set: function (_created) {
            if (typeof _created === "string") {
                this._created = new Date(_created);

            } else if (_created instanceof Date) {
                this._created = _created;
            }
        },
        get: function () {
            return this._created;
        },
        configurable: true
    },

    id: {
        set: function (_id) {
            _id = +_id;

            if (!isNaN(_id) && this._id !== _id) {
                this._id = _id;
            }
        },
        get: function () {
            return this._id;
        },
        configurable: true
    },

    dateUpdated: {
        set: function (_updated) {
            if (typeof _updated === "string") {
                this._updated = new Date(_updated);

            } else if (_updated instanceof Date) {
                this._updated = _updated;
            }
        },
        get: function () {
            return this._updated;
        },
        configurable: true
    },

    canSudo: {
        set: function (_sudo) {
            _sudo = !!_sudo;

            if (_sudo !== this._sudo) {
                this._sudo = _sudo;
            }
        },
        get: function () {
            return this._sudo;
        },
        configurable: true
    }

});
