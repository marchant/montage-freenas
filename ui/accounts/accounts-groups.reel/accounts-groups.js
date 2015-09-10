var Component = require("montage/ui/component").Component;

/**
 * @class AccountsGroups
 * @extends Component
 */
exports.AccountsGroups = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.refreshGroupList();
            }
        }
    },

    userDataSource: {
        value: null
    },

    refreshGroupList: {
        value: function () {
            this.groupDataSource = this.application.controller.getGroupList(this.groupDataSource);
        }
    }

});
