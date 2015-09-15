exports.ViewController = {

    signInWindow: {
        value: null,
        writable: true
    },

    menuController: {
        value: null,
        writable: true
    },

    displayDashboard: {
        value: function () {
            this.displayView("dashboard");
        }
    },

    displayView: {
        value: function (_view) {
            if (this.currentLoggedUser) {
                this.menuController.selectedValue = _view;
            }
        }
    },

    hideCurrentView: {
        value: function () {
            this.menuController.selectedValue = null;
        }
    },

    displaySignInWindow: {
        value: function () {
            this.signInWindow.show();
        }
    }

};
