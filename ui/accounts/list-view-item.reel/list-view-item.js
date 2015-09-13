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
                    this._iconText = (
                        this._getInitials(this.description) ||
                        this._getInitials(this.name)
                    );
                    this._iconColor = this._getPastelColor(
                        (this.description.length + this.name.length) * 100 * Math.E
                    );
                    this.needsDraw = true;
                } else {
                    if (this._data instanceof Group) {
                        this.name = this._data.name;
                        this.description = this._data.id;
                        this._iconText = this._getInitials(this.name);
                        this._iconColor = this._getPastelColor(
                            (this.description.toString().length + this.name.length) * 100 * Math.E
                        );
                        this.needsDraw = true;
                    }
                }
            }
        }
    },

    _getInitials: {
        value: function (string) {
            var words = string.toString().trim().split(" ");

            if (words.length) {
                return (words[0].charAt(0) + (
                    words.length > 1 ?
                    words[words.length - 1].charAt(0) :
                    words[0].charAt(words[0].length - 1)
                )).toUpperCase();
            }
            return null;
        }
    },

    _getPastelColor: {
        value: function (seed) {
            return "hsl(" + (137.5 * seed % 360) + ",25%,60%)";
        }
    },

    draw: {
        value: function () {
            if (this._iconText) {
                this.iconElement.textContent = this._iconText;
                this.iconElement.style.backgroundColor = this._iconColor;
            }
        }
    }

});
