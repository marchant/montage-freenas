var Component = require("montage/ui/component").Component;

/**
 * @class Network
 * @extends Component
 */
exports.Network = Component.specialize({

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
                this.addDnsInput.addEventListener("keydown", this, false);
            }
        }
    },

    handleKeydown: {
        value: function (event) {
            if (event.keyCode === 13) {
                alert("user entered a new DNS");
            }
        }
    }

});
