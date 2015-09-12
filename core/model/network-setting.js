var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor;

/**
 * @class NetworkSetting
 */
var NetworkSetting = exports.NetworkSetting = function NetworkSetting () {
    this._gateway = {
        ipv4: null,
        ipv6: null
    };

    this._dns = {
        addresses: null,
        search: []
    }
};

NetworkSetting._type = null;

Object.defineProperty(NetworkSetting, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "NetworkSetting";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


NetworkSetting.prototype._gateway = null;
NetworkSetting.prototype._dns = null;
NetworkSetting.prototype._autoConfig = false;
NetworkSetting.prototype.httpProxy = null;

//fixme: need investigating
NetworkSetting.prototype.dhcp = {
    assign_dns: true,
    assign_gateway: true
};


Object.defineProperties(NetworkSetting.prototype, {

    isAutoConfigEnabled: {
        set: function (_autoConfig) {
            _autoConfig = !!_autoConfig;

            if (this._autoConfig !== _autoConfig) {
                this._autoConfig = _autoConfig;
            }
        },
        get: function () {
            return this._autoConfig;
        },
        configurable: true
    },

    ipV4Gateway: {
        set: function (_ipv4) {
            if (typeof _ipv4 === "string" && this._gateway.ipv4 !== _ipv4) {
                this._gateway.ipv4 = _ipv4;
            }
        },
        get: function () {
            return this._gateway.ipv4;
        }
    },

    ipV6Gateway: {
        set: function (_ipv6) {
            if (typeof _ipv6 === "string" && this._gateway.ipv6 !== _ipv6) {
                this._gateway.ipv6 = _ipv6;
            }
        },
        get: function () {
            return this._gateway.ipv6;
        }
    },

    dnsAddresses: {
        set: function (_dnsAddresses) {
            if (_dnsAddresses && this._gateway.ipv6 !== _dnsAddresses) {
                this._dns.addresses = _dnsAddresses;
            }
        },
        get: function () {
            if (!this._dns.addresses) {
                this._dns.addresses = [];
            }

            return this._dns.addresses;
        }
    }

});
