var Component = require("montage/ui/component").Component;

/**
 * @class AccountsGroups
 * @extends Component
 */
exports.AccountsGroups = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.populateGroupList();
            }
        }
    },

    groupList: {
        value: null
    },

    populateGroupList: {
        value: function () {
            var self = this;

            this.application.controller.getGroupList().then(function (_groupList) {
                self.groupList = _groupList;
            });
        }
    }

});
