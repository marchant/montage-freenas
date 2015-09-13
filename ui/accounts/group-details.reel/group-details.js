var Component = require("montage/ui/component").Component;

/**
 * @class GroupDetails
 * @extends Component
 */
exports.GroupDetails = Component.specialize({

    handleCloseAction: {
        value: function () {
            this.dataController.selection = [];
        }
    }

});
