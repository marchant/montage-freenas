var NetworkInterface = require("core/model/network-interface").NetworkInterface,
    NetworkUtility = require("core/utility/network-utility.js").NetworkUtility;

/**
 * @class NetworkInterfaceProxy
 */
var NetworkInterfaceProxy = exports.NetworkInterfaceProxy = function NetworkInterfaceProxy () {};

NetworkInterfaceProxy.createFromNetworkInterface = function (_networkInterface) {
    if (_networkInterface instanceof NetworkInterface) {
        var networkInterfaceProxy = new NetworkInterfaceProxy();

        networkInterfaceProxy.id = _networkInterface.id;
        networkInterfaceProxy.isEnabled = _networkInterface.isEnabled;
        networkInterfaceProxy.staticIpAddress = _networkInterface.staticIpAddress;

        // read-only properties
        networkInterfaceProxy.isDhcpEnabled = _networkInterface.isDhcpEnabled;
        networkInterfaceProxy.macAddress = _networkInterface.macAddress;
        networkInterfaceProxy.aliases = _networkInterface.aliases;
        networkInterfaceProxy.ethernetAdapterSpeed = _networkInterface.ethernetAdapterSpeed;

        return networkInterfaceProxy;
    }
};


NetworkInterfaceProxy.prototype._enabled = true;
NetworkInterfaceProxy.prototype._dhcp = true;
NetworkInterfaceProxy.prototype._staticIpAddress = null;
NetworkInterfaceProxy.prototype.id = null;
NetworkInterfaceProxy.prototype.macAddress = null;
NetworkInterfaceProxy.prototype.aliases = null;
NetworkInterfaceProxy.prototype.ethernetAdapterSpeed = null;


Object.defineProperties(NetworkInterfaceProxy.prototype, {

    isEnabled: {
        set: function (_enabled) {
            _enabled = !!_enabled;

            if (_enabled !== this._enabled) {
                this._enabled = _enabled;
            }
        },
        get: function () {
            return this._enabled;
        },
        configurable: true
    },

    staticIpAddress: {
        set: function (_staticIpAddress) {
            if (typeof _staticIpAddress === "string" && _staticIpAddress !== this._staticIpAddress && NetworkUtility.isIPv4WithNetmask(_staticIpAddress)) {
                this._staticIpAddress = _staticIpAddress;
            }
        },
        get: function () {
            return this._staticIpAddress;
        },
        configurable: true
    },

    isDhcpEnabled: {
        set: function (_dhcp) {
            _dhcp = !!_dhcp;

            if (_dhcp !== this._dhcp) {
                this._dhcp = _dhcp;
            }
        },
        get: function () {
            return this._dhcp;
        },
        configurable: true
    }

});
