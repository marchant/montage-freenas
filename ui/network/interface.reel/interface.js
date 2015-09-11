var Component = require("montage/ui/component").Component;

/**
 * @class Interface
 * @extends Component
 */
exports.Interface = Component.specialize({

    handleToggleAction: {
        value: function () {
            this.interface.isActive = !this.interface.isActive;
        }
    }

});
