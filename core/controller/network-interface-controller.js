var DataStream = require("montage-data/logic/service/data-stream").DataStream,
    NetworkInterfaceProxy = require("core/proxy/network-interface-proxy").NetworkInterfaceProxy,
    NetworkInterface = require("core/model/network-interface").NetworkInterface;


exports.NetworkInterfaceController = {

    getNetworkInterfaceList: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(NetworkInterface.TYPE, _dataSource).then(function (data) {
                var networkInterfaceProxies = [];

                for (var i = 0, length = data.length; i < length; i++) {
                    networkInterfaceProxies.push(NetworkInterfaceProxy.createFromNetworkInterface(data[i]));
                }

                return networkInterfaceProxies;
            });
        }
    }

};
