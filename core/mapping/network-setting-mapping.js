var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    NetworkSetting = require("core/model/network-setting").NetworkSetting;

exports.NetworkSettingMapping = DataMapping.specialize({

    mapRawData: {
        value: function (rawObject) {
            var networkSetting = new NetworkSetting();

            if (rawObject.gateway) {
                networkSetting.ipV4Gateway = rawObject.gateway.ipv4;
                networkSetting.ipV6Gateway = rawObject.gateway.ipv6;
            }

            networkSetting.isAutoConfigEnabled = rawObject.autoconfigure;
            networkSetting.dnsAddresses = rawObject.dns.addresses;
            networkSetting.httpProxy = rawObject.http_proxy;

            return networkSetting;
        }
    }

});
