var Component = require("montage/ui/component").Component;

/**
 * @class Network
 * @extends Component
 */
exports.Network = Component.specialize({

    networkConfigProxy: {
        value: null
    },

    serverListComponent: {
        value: null
    },

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
                // fixme: -> need to use a montage text-input component
                // hitting the key enter raise an action event.
                this.addDnsInput.addEventListener("keydown", this, false);
                this._getNetworkConfig();
            }
        }
    },

    handleKeydown: {
        value: function (event) {
            if (event.keyCode === 13) {
                if (this._addDnsAddress(this.addDnsInput.value)) {
                    this.addDnsInput.value = ""; //fixme: [need discussion] do we need to reset the field?
                }
            }
        }
    },

    handleResetAction: {
        value: function () {
            alert("reset");
        }
    },

    handleApplyAction: {
        value: function () {
            this.application.controller.updateNetworkConfig(this.networkConfigProxy);
        }
    },

    handleDeleteDnsAddressAction: {
        value: function (event) {
            var iteration = this.serverListComponent._findIterationContainingElement(event.target.element);

            if (iteration) {
                this._removeDnsAddress(iteration.object);
            }
        }
    },

    _addDnsAddress: {
        value: function (_dnsAddress) {
            return this.networkConfigProxy.addDNSAddress(_dnsAddress);
        }
    },

    _removeDnsAddress: {
        value: function (_dnsAddress) {
            return this.networkConfigProxy.removeDNSAddress(_dnsAddress);
        }
    },

    _getNetworkConfig: {
        value: function () {
            var self = this;

            return this.application.controller.getNetworkConfig().then(function (_networkConfigProxy) {
                self.networkConfigProxy = _networkConfigProxy;
            });
        }
    }

});
