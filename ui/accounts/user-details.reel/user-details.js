var Component = require("montage/ui/component").Component;

/**
 * @class UserDetails
 * @extends Component
 */
exports.UserDetails = Component.specialize({

    handleCloseAction: {
        value: function () {
            this.dataController.selection = [];
        }
    }

});
