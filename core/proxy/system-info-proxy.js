var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    NetworkUtility = require("core/utility/network-utility.js").NetworkUtility,
    System = require("core/model/system").System;

/**
 * @class SystemInfoProxy
 */
var SystemInfoProxy = exports.SystemInfoProxy = function SystemInfoProxy (_hostname) {
    this._hostname = _hostname;
};

SystemInfoProxy.prototype = new AbstractProxy();
SystemInfoProxy.prototype._hostname = null;

Object.defineProperties(SystemInfoProxy.prototype, {

    hostname: {
        set: function (_hostname) {
            this._updateValue(System.prototype, "hostname", _hostname);
        },
        get: function () {
            return this._hostname;
        },
        configurable: true
    }

});

SystemInfoProxy.prototype.checkValidity = function (key) {
    if (key === "hostname") {
        this.validity.isHostnameValid = this.hostname ? NetworkUtility.isHostName(this.hostname) : true;
    }

    return typeof this.validity.isHostnameValid === "boolean" ? this.validity.isHostnameValid : true;
};

SystemInfoProxy.prototype.toRawObject = function () {
    return {
        hostname: this.hostname
    };
};
