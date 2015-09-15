var Component = require("montage/ui/component").Component;

/**
 * @class NotificationBar
 * @extends Component
 */
exports.NotificationBar = Component.specialize({

    handleLogoutAction: {
        value: function () {
            var controller = this.application.controller;

            controller.logout();
            controller.promptSignInWindow();
        }
    }

});
