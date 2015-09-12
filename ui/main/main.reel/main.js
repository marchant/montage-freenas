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
                //fixme: need to be removed, just waiting for connection UI
                this.blockDrawGate.setField("connectionEstablished", false);
                Application.addEventListener("connectionEstablished", this, false);
            }
        }
    },

    //fixme: need to be removed, just waiting for connection UI
    handleConnectionEstablished: {
        value: function () {
            this.blockDrawGate.setField("connectionEstablished", true);
        }
    }

});
