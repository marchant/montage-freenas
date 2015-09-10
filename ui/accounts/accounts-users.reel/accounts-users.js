var Component = require("montage/ui/component").Component;

/**
 * @class AccountsUsers
 * @extends Component
 */
exports.AccountsUsers = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.refreshUserList();
            }
        }
    },

    userDataSource: {
        value: null
    },

    refreshUserList: {
        value: function () {
            this.userDataSource = this.application.controller.getUserList(this.userDataSource);
        }
    }

});
