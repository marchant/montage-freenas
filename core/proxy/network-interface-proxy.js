var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    NetworkInterface = require("core/model/network-interface").NetworkInterface,
    NetworkUtility = require("core/utility/network-utility.js").NetworkUtility;

/**
 * @class NetworkInterfaceProxy
 */
var NetworkInterfaceProxy = exports.NetworkInterfaceProxy = function NetworkInterfaceProxy () {};

NetworkInterfaceProxy.createFromNetworkInterface = function (_networkInterface) {
    if (_networkInterface instanceof NetworkInterface) {
        var networkInterfaceProxy = new NetworkInterfaceProxy();

        networkInterfaceProxy._enabled = _networkInterface.isEnabled;
        networkInterfaceProxy._staticIpAddress = _networkInterface.staticIpAddress;
        networkInterfaceProxy._dhcp = _networkInterface.isDhcpEnabled;

        // read-only properties
        networkInterfaceProxy.id = _networkInterface.id;
        networkInterfaceProxy.macAddress = _networkInterface.macAddress;
        networkInterfaceProxy.aliases = _networkInterface.aliases;
        networkInterfaceProxy.ethernetAdapterSpeed = _networkInterface.ethernetAdapterSpeed;

        return networkInterfaceProxy;
    }
};

NetworkInterfaceProxy.prototype = new AbstractProxy();
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
            this._updateValue(NetworkInterface.prototype, "isEnabled", _enabled);
        },
        get: function () {
            return this._enabled;
        },
        configurable: true
    },

    staticIpAddress: {
        set: function (_staticIpAddress) {
            this._updateValue(NetworkInterface.prototype, "staticIpAddress", _staticIpAddress);

        },
        get: function () {
            return this._staticIpAddress;
        },
        configurable: true
    },

    isDhcpEnabled: {
        set: function (_dhcp) {
            this._updateValue(NetworkInterface.prototype, "isDhcpEnabled", _dhcp);
        },
        get: function () {
            return this._dhcp;
        },
        configurable: true
    }

});

NetworkInterfaceProxy.prototype.checkValidity = function (key) {
    if (key === "staticIpAddress") {
        this.validity.isStaticIPValid = this._staticIpAddress ? NetworkUtility.isIPv4WithNetmask(this._staticIpAddress) : true;
    }
};
