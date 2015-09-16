var ManagementConnectionSetting = require("core/model/system-setting").ManagementConnectionSetting;

/**
 * @class ManagementConnectionSettingProxy
 */
var ManagementConnectionSettingProxy = exports.ManagementConnectionSettingProxy = function ManagementConnectionSettingProxy () {};


ManagementConnectionSettingProxy.createFromManagementConnectionSetting = function (_managementConnectionSetting) {
    if (_managementConnectionSetting instanceof ManagementConnectionSetting) {
        var managementConnectionSettingProxy = new ManagementConnectionSettingProxy();

        managementConnectionSettingProxy.httpPort = _managementConnectionSetting.httpPort;
        managementConnectionSettingProxy.httpsPort = _managementConnectionSetting.httpsPort;
        managementConnectionSettingProxy.isRedirectHypertextTransferProtocols = _managementConnectionSetting.isRedirectHypertextTransferProtocols;
        managementConnectionSettingProxy.currentHypertextTransferProtocol = _managementConnectionSetting.currentHypertextTransferProtocol;
        managementConnectionSettingProxy.httpsCertificate = _managementConnectionSetting.httpsCertificate;

        return managementConnectionSettingProxy;
    }
};


ManagementConnectionSettingProxy.prototype = new ManagementConnectionSetting();
