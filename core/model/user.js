var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel,
    Group = require("core/model/group").Group;

/**
 * @class User
 */
var User = exports.User = function User () {};

User._type = null;

Object.defineProperty(User, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "User";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


User.prototype = new AbstractModel();

User.prototype._username = null;

User.prototype.attributes = null;

User.prototype._builtIn = true;

User.prototype._created = null;

User.prototype._email = null;

User.prototype._fullName = null;

User.prototype._group = null;

User.prototype.groups = null;

User.prototype._home = null;

User.prototype._id = null;

User.prototype._locked = false;

User.prototype._logged = false;

User.prototype._passwordDisabled = false;

User.prototype.shell = null;

User.prototype.sessions = null;

User.prototype.smbHash = null;

User.prototype.shell = null;

User.prototype.sshPublicKey = null;

User.prototype._sudo = false;

User.prototype.unixHash = null;

User.prototype._updated = null;

User.prototype.groupID = null;

User.prototype._fetchGroupPromise= null;


Object.defineProperties(User.prototype, {
    username: {
        set: function (_username) {
            if (typeof _username === "string" && _username.length && _username !== this._username) {
                this._username = _username;
            }
        },
        get: function () {
            return this._username;
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

    email: {
        set: function (_email) {
            if (typeof _email === "string" && this._email !== _email) {
                this._email = _email;
            }
        },
        get: function () {
            return this._email;
        },
        configurable: true
    },

    fullName: {
        set: function (_fullName) {
            if (typeof _fullName === "string" && this._fullName !== _fullName) {
                this._fullName = _fullName;
            }
        },
        get: function () {
            return this._fullName;
        },
        configurable: true
    },

    group: {
        set: function (_group) {
            this._group = _group;
        },
        get: function () {
            if (!this._group && !this._fetchGroupPromise) {
                var self = this;

                this._fetchGroupPromise = this._store.findModelObjectWithID(Group.TYPE, this.groupID).then(function (_group) {
                    self.group = _group;
                    self._fetchGroupPromise = null;
                });
            }

            return this._group;
        },
        configurable: true
    },

    home: {
        set: function (_home) {
            if (typeof _home === "string" && this._home !== _home) {
                this._home = _home;
            }
        },
        get: function () {
            return this._home;
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

    isLocked: {
        set: function (_locked) {
            _locked = !!_locked;

            if (_locked !== this._locked) {
                this._locked = _locked;
            }
        },
        get: function () {
            return this._builtIn;
        },
        configurable: true
    },

    isLogged: {
        set: function (_logged) {
            _logged = !!_logged;

            if (_logged !== this._logged) {
                this._logged = _logged;
            }
        },
        get: function () {
            return this._logged;
        },
        configurable: true
    },

    isPasswordDisabled: {
        set: function (_passwordDisabled) {
            _passwordDisabled = !!_passwordDisabled;

            if (_passwordDisabled !== this._passwordDisabled) {
                this._passwordDisabled = _passwordDisabled;
            }
        },
        get: function () {
            return this._passwordDisabled;
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

    shell: {
        set: function (_shell) {
            if (typeof _shell === "string" && this._shell !== _shell) {
                this._shell = _shell;
            }
        },
        get: function () {
            return this._shell;
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
