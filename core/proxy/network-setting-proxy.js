var NetworkSetting = require("core/model/network-setting").NetworkSetting;

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


NetworkSettingProxy.prototype._ipV4Gateway = null;
NetworkSettingProxy.prototype._dnsAddresses = null;
NetworkSettingProxy.prototype._ipV6Gateway = null;


Object.defineProperties(NetworkSettingProxy.prototype, {

    ipV4Gateway: {
        set: function (_ipV4Gateway) {
            if (typeof _ipV4Gateway === "string" && _ipV4Gateway !== this._ipV4Gateway) { //todo better checking
                this._ipV4Gateway = _ipV4Gateway || null;
            }
        },
        get: function () {
            return this._ipV4Gateway;
        },
        configurable: true
    },

    ipV6Gateway: {
        set: function (_ipV6Gateway) {
            if (typeof _ipV6Gateway === "string" && _ipV6Gateway !== this._ipV6Gateway) { //todo better checking
                this._ipV6Gateway = _ipV6Gateway || null;
            }
        },
        get: function () {
            return this._ipV6Gateway;
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

        return true;
    }

    return false;
};


NetworkSettingProxy.prototype.removeDNSAddress = function (_dnsAddress) {
    var index;

    if (typeof _dnsAddress === "string" && (index = this._dnsAddresses.indexOf(_dnsAddress)) > -1) {
        this._dnsAddresses.splice(index, 1);

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
