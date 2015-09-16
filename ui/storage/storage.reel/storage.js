var Component = require("montage/ui/component").Component;

/**
 * @class Storage
 * @extends Component
 */
exports.Storage = Component.specialize({

    handleCreateAction: {
        value: function () {
            this.topology.reset();
            this.isShowingConfig = true;
        }
    },

    _isShowingConfig: {
        value: null
    },

    isShowingConfig: {
        get: function () {
            return this._isShowingConfig;
        },
        set: function (value) {
            this._isShowingConfig = value;
            if (value) {
                this.classList.add("Storage-isShowingConfig");
            } else {
                this.classList.remove("Storage-isShowingConfig");
            }
        }
    },

    updateTotals: {
        value: function () {
            console.log("bar");
        }
    }

});
