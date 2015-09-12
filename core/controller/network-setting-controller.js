var NetworkSettingProxy = require("core/proxy/network-setting-proxy").NetworkSettingProxy,
    DataStream = require("montage-data/logic/service/data-stream").DataStream,
    MessageCommand = require("core/backend/message-command").MessageCommand,
    NetworkSetting = require("core/model/network-setting").NetworkSetting;


exports.NetworkSettingController = {

    getNetworkConfig: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(NetworkSetting.TYPE, _dataSource).then(function (response) {
                var networkSettingProxy = null;

                if (response && response.length) {
                    networkSettingProxy = NetworkSettingProxy.createFromNetworkSetting(response[0])
                }

                return networkSettingProxy;
            });
        }
    },

    updateNetworkConfig: {
        value: function (_networkSettingProxy) {
            if (_networkSettingProxy instanceof NetworkSettingProxy) {
                var messageCommand = new MessageCommand("rpc", "call", {
                    method: "task.submit",
                    args: [ "network.configure", [_networkSettingProxy.toNetworkSettingRawObject()]]
                });

                return this._backend.send(messageCommand).then((function (response) {
                    debugger
                }));
            }

            return Promise.reject("wrong parameters given");
        }
    }

};
