var NetworkSettingProxy = require("core/proxy/network-setting-proxy").NetworkSettingProxy,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    NetworkSetting = require("core/model/network-setting").NetworkSetting;


exports.NetworkSettingController = {

    getNetworkSetting: {
        value: function () {
            return this._getNetworkSetting().then(function (_networkSetting) {
                return _networkSetting ? NetworkSettingProxy.createFromNetworkSetting(_networkSetting) : null;
            });
        }
    },

    updateNetworkSetting: {
        value: function (_networkSettingProxy) {
            if (_networkSettingProxy instanceof NetworkSettingProxy) {
                var self = this;

                return this._getNetworkSetting().then(function (_networkSetting) {
                    if (self._shouldUpdateNetworkSetting(_networkSetting, _networkSettingProxy)) {
                        var messageCommand = new MessageCommand("rpc", "call", {
                            method: "task.submit",
                            args: [ "network.configure", [_networkSettingProxy.toNetworkSettingRawObject()]]
                        });

                        //fixme: seems to break the server.
                        //return this._backend.send(messageCommand).then((function (response) {
                        //    debugger
                        //}));
                    }
                });


            }

            return Promise.reject("wrong parameters given");
        }
    },

    _getNetworkSetting: {
        value: function () {
            return this._store.getModelObjectList(NetworkSetting.TYPE).then(function (response) {
                return response && response.length ? response[0] : null;
            });
        }
    },

    _shouldUpdateNetworkSetting: {
        value: function (_networkSetting, _networkSettingProxy) {
            var response = _networkSettingProxy.ipV4Gateway !== _networkSetting.ipV4Gateway || _networkSettingProxy.ipV6Gateway !== _networkSetting.ipV6Gateway;

            if (!response) {
                // `_networkSettingProxy.dnsAddresses` and `_networkSetting.dnsAddresses` are always an array.
                response = _networkSettingProxy.dnsAddresses.length !== _networkSetting.dnsAddresses.length;

                if (!response) {
                    var dnsAddressProxy = _networkSettingProxy._dnsAddresses,
                        dnsAddress = _networkSetting.dnsAddresses;

                    for (var i = 0, length = dnsAddressProxy.length; i < length && response === false; i++) {
                        response = dnsAddress.indexOf(dnsAddressProxy[i]) === -1;
                    }
                }
            }

            return response;
        }
    }

};
