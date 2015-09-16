var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel;

/**
 * @class NetworkSetting
 */
var NetworkSetting = exports.NetworkSetting = function NetworkSetting () {};

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

NetworkSetting.prototype= new AbstractModel();

NetworkSetting.prototype._ipv4 = null;
NetworkSetting.prototype._ipv6 = null;
NetworkSetting.prototype._dnsAddresses = null;


Object.defineProperties(NetworkSetting.prototype, {

    ipV4Gateway: {
        set: function (_ipv4) {
            if (typeof _ipv4 === "string" && this._ipv4 !== _ipv4) {
                this._ipv4 = _ipv4 || null;
            }
        },
        get: function () {
            return this._ipv4;
        }
    },

    ipV6Gateway: {
        set: function (_ipv6) {
            if (typeof _ipv6 === "string" && this._ipv6 !== _ipv6) {
                this._ipv6 = _ipv6 || null;
            }
        },
        get: function () {
            return this._ipv6;
        }
    },

    dnsAddresses: {
        set: function (_dnsAddresses) {
            if (_dnsAddresses && _dnsAddresses.constructor === Array && this._dnsAddresses !== _dnsAddresses) {
                this._dnsAddresses = _dnsAddresses;
            }
        },
        get: function () {
            if (!this._dnsAddresses) {
                this._dnsAddresses = [];
            }

            return this._dnsAddresses;
        }
    }

});
