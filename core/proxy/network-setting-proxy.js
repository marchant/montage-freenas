var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    NetworkSetting = require("core/model/network-setting").NetworkSetting;

/**
 * @class NetworkSettingProxy
 */
var NetworkSettingProxy = exports.NetworkSettingProxy = function NetworkSettingProxy () {};

NetworkSettingProxy.createFromNetworkSetting = function (_networkSetting) {
    var networkSettingProxy = new NetworkSettingProxy(),
        dnsAddresses = _networkSetting.dnsAddresses,
        dnsAddressesProxy = networkSettingProxy.dnsAddresses;

    networkSettingProxy.ipV4Gateway = _networkSetting.ipV4Gateway;
    networkSettingProxy.ipV6Gateway = _networkSetting.ipV6Gateway;

    for (var i = 0, length = dnsAddresses.length; i < length; i++) {
        dnsAddressesProxy.push(dnsAddresses[i]);
    }

    return networkSettingProxy;
};

NetworkSettingProxy.prototype = new AbstractProxy();
NetworkSettingProxy.prototype._ipv4 = null;
NetworkSettingProxy.prototype._ipv6 = null;
NetworkSettingProxy.prototype._dnsAddresses = null;

Object.defineProperties(NetworkSettingProxy.prototype, {

    ipV4Gateway: {
        set: function (_ipv4) {
            this._updateValue(NetworkSetting.prototype, "ipV4Gateway", _ipv4);
        },
        get: function () {
            return this._ipv4;
        },
        configurable: true
    },

    ipV6Gateway: {
        set: function (_ipv6) {
            this._updateValue(NetworkSetting.prototype, "ipV6Gateway", _ipv6);

        },
        get: function () {
            return this._ipv6;
        },
        configurable: true
    },

    dnsAddresses: {
        get: function () {
            if (!this._dnsAddresses) {
                this._dnsAddresses = [];
            }

            return this._dnsAddresses;
        },
        configurable: true
    }

});


NetworkSettingProxy.prototype.addDNSAddress = function (_dnsAddress) {
    if (typeof _dnsAddress === "string" && _dnsAddress.length && this._dnsAddresses.indexOf(_dnsAddress) === -1) { //todo better checking
        this._dnsAddresses.push(_dnsAddress);
        this.isDirty = true;

        return true;
    }

    return false;
};


NetworkSettingProxy.prototype.removeDNSAddress = function (_dnsAddress) {
    var index;

    if (typeof _dnsAddress === "string" && (index = this._dnsAddresses.indexOf(_dnsAddress)) > -1) {
        this._dnsAddresses.splice(index, 1);
        this.isDirty = true;

        return true;
    }

    return false;
};

NetworkSettingProxy.prototype.toNetworkSettingRawObject = function () {
    var networkConfig = {};

    if (this._ipV4Gateway) {
        networkConfig.gateway = {};
        networkConfig.gateway.ipv4 = this._ipV4Gateway;
    }

    if (this._ipV6Gateway) {
        if (!networkConfig.gateway) {
            networkConfig.gateway = {};
        }

        networkConfig.gateway.ipv6 = this._ipV6Gateway;
    }

    if (this._dnsAddresses && this._dnsAddresses.length) {
        networkConfig.dns = {addresses: this._dnsAddresses};
    }

    return networkConfig;
};
