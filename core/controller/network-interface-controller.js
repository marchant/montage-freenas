var NetworkInterfaceProxy = require("core/proxy/network-interface-proxy").NetworkInterfaceProxy,
    NetworkInterface = require("core/model/network-interface").NetworkInterface;


exports.NetworkInterfaceController = {

    getNetworkInterfaceList: {
        value: function () {
            return this._store.getModelObjectList(NetworkInterface.TYPE).then(function (data) {
                var networkInterfaceProxies = [];

                for (var i = 0, length = data.length; i < length; i++) {
                    networkInterfaceProxies.push(NetworkInterfaceProxy.createFromNetworkInterface(data[i]));
                }

                return networkInterfaceProxies;
            });
        }
    }

};
