var Component = require("montage/ui/component").Component;

/**
 * @class Network
 * @extends Component
 */
exports.Network = Component.specialize({

    networkSettingProxy: {
        value: null
    },

    serverListComponent: {
        value: null
    },

    networkInterfaces: {
        value: null
    },

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
                // fixme: -> need to use a montage text-input component
                // hitting the key enter raise an action event.
                this.addDnsInput.addEventListener("keydown", this, false);
                this._populateNetworkConfig();
                this._populateNetworkInterface();
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
            // get a new NetworkSettingProxy with the latest saved config.
            this._populateNetworkConfig();
        }
    },

    handleApplyAction: {
        value: function () {
            this.application.controller.updateNetworkSetting(this.networkSettingProxy);
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
            return this.networkSettingProxy.addDNSAddress(_dnsAddress);
        }
    },

    _removeDnsAddress: {
        value: function (_dnsAddress) {
            return this.networkSettingProxy.removeDNSAddress(_dnsAddress);
        }
    },

    _populateNetworkConfig: {
        value: function () {
            var self = this;

            return this.application.controller.getNetworkSetting().then(function (_networkSettingProxy) {
                self.networkSettingProxy = _networkSettingProxy;
            });
        }
    },

    _populateNetworkInterface: {
        value: function () {
            var self = this;

            return this.application.controller.getNetworkInterfaceList().then(function (_networkInterfaces) {
                self.networkInterfaces = _networkInterfaces;
            });
        }
    }

});
