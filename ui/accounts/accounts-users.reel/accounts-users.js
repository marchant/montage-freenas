var Component = require("montage/ui/component").Component;

/**
 * @class AccountsUsers
 * @extends Component
 */
exports.AccountsUsers = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.populateUserList();
            }
        }
    },

    userList: {
        value: null
    },

    populateUserList: {
        value: function () {
            var self = this;

            this.application.controller.getUserList().then(function (_userList) {
                self.userList = _userList;
            });
        }
    }

});
