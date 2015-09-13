var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    NetworkUtility = require("core/utility/network-utility.js").NetworkUtility,
    AbstractModel = require("core/model/abstract-model").AbstractModel;

/**
 * @class InterfaceNetwork
 */
var NetworkInterface = exports.NetworkInterface = function NetworkInterface () {};

NetworkInterface._type = null;

NetworkInterface.LINK_STATES = [
    "LINK_STATE_UP",
    "LINK_STATE_DOWN",
    "LINK_STATE_UNKNOWN"
];

NetworkInterface.ETHERNET_ALLOWED_SPEED = [
    10,
    100,
    1000
];

Object.freeze(NetworkInterface.LINK_STATES);
Object.freeze(NetworkInterface.ETHERNET_ALLOWED_SPEED);

Object.defineProperty(NetworkInterface, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "NetworkInterface";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});


NetworkInterface.prototype= new AbstractModel();

NetworkInterface.prototype._enabled = true;
NetworkInterface.prototype._dhcp = true;
NetworkInterface.prototype._type = null;
NetworkInterface.prototype._id = null;
NetworkInterface.prototype._mac = null;
NetworkInterface.prototype._allowedLinkSpeeds = null;
NetworkInterface.prototype._state = null;
NetworkInterface.prototype._aliases = null;
NetworkInterface.prototype._staticIpAddress = null;


Object.defineProperties(NetworkInterface.prototype, {

    id: {
        set: function (_id) {
            if (typeof _id === "string" && _id !== this._id) {
                this._id = _id;
            }
        },
        get: function () {
            return this._id;
        },
        configurable: true
    },

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
    },

    type: {
        set: function (_type) {
            if (typeof _type === "string" && _type !== this._type) {
                this._type = _type;
            }
        },
        get: function () {
            return this._type;
        },
        configurable: true
    },

    macAddress: {
        set: function (_mac) {
            if (typeof _mac === "string" && _mac !== this._mac) {
                this._mac = _mac;
            }
        },
        get: function () {
            return this._mac;
        },
        configurable: true
    },

    linkState: {
        set: function (_state) {
            if (typeof _state === "string" && NetworkInterface.LINK_STATES.indexOf(_state) > -1) {
                this._state = _state;

                switch (_state) {
                    case "LINK_STATE_UNKNOWN":
                        this._allowedLinkSpeeds = null;
                        break;
                    case "LINK_STATE_UP":
                    case "LINK_STATE_DOWN":
                        //fixme: need investigating (other kind of links ...)
                        this._allowedLinkSpeeds = NetworkInterface.ETHERNET_ALLOWED_SPEED;
                        break;
                }
            }
        },
        get: function () {
            return this._state;
        },
        configurable: true
    },

    allowedLinkSpeeds: {
        get: function () {
            return this._allowedLinkSpeeds;
        }
    },

    staticIpAddress: {
        set: function (_staticIpAddress) {
            if (typeof _staticIpAddress === "string" && _staticIpAddress !== this._staticIpAddress) {
                this._staticIpAddress = _staticIpAddress;
            }
        },
        get: function () {
            if (!this._staticIpAddress) {
                //fixme: need explanation?
                this._staticIpAddress = this._aliases && this._aliases.length ?
                    this._aliases[0].ipAddress + "/" + this._aliases[0].netmask : "0.0.0.0/24";
            }

            return this._staticIpAddress;
        },
        configurable: true
    },

    aliases: {
        set: function (_aliases) {
            if (_aliases && _aliases.constructor === Array) {
                this._aliases = _aliases;
            }
        },
        get: function () {
            return this._aliases;
        }
    }

});

var NetworkInterfaceAlias = exports.NetworkInterfaceAlias = function NetworkInterfaceAlias () {};


NetworkInterfaceAlias.prototype._ipAddress = null;
NetworkInterfaceAlias.prototype._broadcast = null;
NetworkInterfaceAlias.prototype._netmask = null;
NetworkInterfaceAlias.prototype._isIPv4 = false;
NetworkInterfaceAlias.prototype._isIPv6 = false;


Object.defineProperties(NetworkInterfaceAlias.prototype, {

    ipAddress: {
        set: function (_ipAddress) {
            if (typeof _ipAddress === "string" && _ipAddress !== this._ipAddress) {
                this._ipAddress = _ipAddress;
            }
        },
        get: function () {
            return this._ipAddress;
        },
        configurable: true
    },

    isIPv4: {
        get: function () {
            if (!this._isIPv4) {
                this._isIPv4 = NetworkUtility.isIPv4(this._ipAddress);
            }

            return this._isIPv4;
        }
    },

    isIPv6: {
        get: function () {
            if (!this._isIPv6) {
                this._isIPv6 = NetworkUtility.isIPv6(this._ipAddress);
            }

            return this._isIPv6;
        }
    },

    broadcast: {
        set: function (_broadcast) {
            if (typeof _broadcast === "string" && _broadcast !== this._broadcast) {
                this._broadcast = _broadcast;
            }
        },
        get: function () {
            return this._broadcast;
        },
        configurable: true
    },

    netmask: {
        set: function (_netmask) {
            _netmask = +_netmask;

            if (!isNaN(_netmask) && _netmask !== this._netmask) {
                this._netmask = _netmask;
            }
        },
        get: function () {
            return this._netmask;
        },
        configurable: true
    }

});
