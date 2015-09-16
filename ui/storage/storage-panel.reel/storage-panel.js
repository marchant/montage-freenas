var Component = require("montage/ui/component").Component;

/**
 * @class StoragePanel
 * @extends Component
 */
exports.StoragePanel = Component.specialize({

    _switchIsExpanded: {
        value: function (component) {
            if (component.classList.has("StoragePanel-isExpanded")) {
                component.classList.remove("StoragePanel-isExpanded");
            } else {
                component.classList.add("StoragePanel-isExpanded");
            }
        }
    },

    handleSsdGroupTitleAction: {
        value: function (event) {
            this._switchIsExpanded(event.target);
        }
    },

    handleHddGroupTitleAction: {
        value: function (event) {
            this._switchIsExpanded(event.target);
        }
    },

    handleResetAction: {
        value: function () {
            this.topology.reset();
        }
    },

    preset: {
        set: function (value) {
            if (value && value !== "none") {
                alert("This functionality in the master branch of github.com/freenas/gui wasn't working as of September 8th, so we haven't implemented it");
            }
        }
    }

});
