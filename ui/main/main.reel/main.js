var Component = require("montage/ui/component").Component,
    Application = require("montage/core/application").application;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize({

    constructor: {
        value: function () {
            this.super();

            if (!Application.isReady) {
                this.blockDrawGate.setField("appReady", false);
                Application.addEventListener("appReady", this, false);
            }
        }
    },

    menuComponent: {
        value: null
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                //fixme: temporary -> need a menu controller or something
                this.application.controller.menuController = this.menuComponent;

                if (this.application.controller.currentLoggedUser) {
                    this.application.controller.displayDashboard();
                }
            }
        }
    },

    handleAppReady: {
        value: function () {
            this.blockDrawGate.setField("appReady", true);
        }
    }

});
