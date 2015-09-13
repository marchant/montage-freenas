var Component = require("montage/ui/component").Component,
    User = require("core/model/user").User,
    Group = require("core/model/group").Group;

/**
 * @class ListViewItem
 * @extends Component
 */
exports.ListViewItem = Component.specialize({

    _data: {
        value: null
    },

    data: {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (this._data) {
                if (this._data instanceof User) {
                    this.name = this._data.username;
                    this.description = this._data.fullName;
                } else {
                    if (this._data instanceof Group) {
                        this.name = this._data.name;
                        this.description = this._data.id;
                    }
                }
            }
        }
    }

});
