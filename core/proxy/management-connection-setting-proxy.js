var AbstractProxy = require("core/proxy/abstract-proxy").AbstractProxy,
    NetworkUtility = require("core/utility/network-utility.js").NetworkUtility,
    ManagementConnectionSetting = require("core/model/system-setting").ManagementConnectionSetting;

/**
 * @class ManagementConnectionSettingProxy
 */
var ManagementConnectionSettingProxy = exports.ManagementConnectionSettingProxy = function ManagementConnectionSettingProxy () {};


ManagementConnectionSettingProxy.createFromManagementConnectionSetting = function (_managementConnectionSetting) {
    if (_managementConnectionSetting instanceof ManagementConnectionSetting) {
        var managementConnectionSettingProxy = new ManagementConnectionSettingProxy();

        managementConnectionSettingProxy._httpPort = _managementConnectionSetting.httpPort;
        managementConnectionSettingProxy._httpsPort = _managementConnectionSetting.httpsPort;
        managementConnectionSettingProxy._redirectHypertextTransferProtocols = _managementConnectionSetting.isRedirectHypertextTransferProtocols;
        managementConnectionSettingProxy._currentHypertextTransferProtocol = _managementConnectionSetting.currentHypertextTransferProtocol;
        managementConnectionSettingProxy.httpsCertificate = _managementConnectionSetting.httpsCertificate;

        return managementConnectionSettingProxy;
    }
};


ManagementConnectionSettingProxy.prototype = new AbstractProxy();
ManagementConnectionSettingProxy.prototype._httpPort = null;
ManagementConnectionSettingProxy.prototype._httpsPort = null;
ManagementConnectionSettingProxy.prototype._redirectHypertextTransferProtocols = false;
ManagementConnectionSettingProxy.prototype._currentHypertextTransferProtocol = null;
ManagementConnectionSettingProxy.prototype.httpsCertificate = null;


Object.defineProperties(ManagementConnectionSettingProxy.prototype, {

    httpPort: {
        set: function (_httpPort) {
            this._updateValue(ManagementConnectionSetting.prototype, "httpPort", _httpPort);
        },
        get: function () {
            return this._httpPort;
        },
        configurable: true
    },

    httpsPort: {
        set: function (_httpsPort) {
            this._updateValue(ManagementConnectionSetting.prototype, "httpsPort", _httpsPort);
        },
        get: function () {
            return this._httpsPort;
        },
        configurable: true
    },

    isRedirectHypertextTransferProtocols: {
        set: function (_redirectHypertextTransferProtocols) {
            this._updateValue(ManagementConnectionSetting.prototype, "isRedirectHypertextTransferProtocols", _redirectHypertextTransferProtocols);
        },
        get: function () {
            return this._redirectHypertextTransferProtocols;
        },
        configurable: true
    },

    currentHypertextTransferProtocol: {
        set: function (_currentHypertextTransferProtocol) {
            this._updateValue(ManagementConnectionSetting.prototype, "currentHypertextTransferProtocol", _currentHypertextTransferProtocol);
        },
        get: function () {
            return this._currentHypertextTransferProtocol;
        },
        configurable: true
    }

});

ManagementConnectionSettingProxy.prototype.checkValidity = function (key) {
    if (key === "httpPort") {
        this.validity.isHttpPortValid = this._staticIpAddress ? NetworkUtility.isPortValid(this.httpPort) : true;

    } else if (key === "httpsPort") {
        this.validity.isHttpsPortValid = this._staticIpAddress ? NetworkUtility.isPortValid(this.httpsPort) : true;
    }

    var isHttpPortValid = typeof this.validity.isHttpPortValid === "boolean" ? this.validity.isHttpPortValid : true,
        isStaticIPValid = typeof this.validity.isStaticIPValid === "boolean" ? this.validity.isStaticIPValid : true;

    return isHttpPortValid && isStaticIPValid;
};


ManagementConnectionSettingProxy.prototype.toRawObject = function () {
    return {
        webui_http_port: this._httpPort,
        webui_https_port: this._httpsPort,
        webui_http_redirect_https: this._redirectHypertextTransferProtocols
    };
};
