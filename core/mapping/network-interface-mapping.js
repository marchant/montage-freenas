var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    NetworkInterfaceModel = require("core/model/network-interface"),
    NetworkInterfaceAlias = NetworkInterfaceModel.NetworkInterfaceAlias;
    NetworkInterface = NetworkInterfaceModel.NetworkInterface;

exports.NetworkInterfaceMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var networkInterface = new NetworkInterface();

            networkInterface.id = rawObject.id;
            networkInterface.isEnabled = rawObject.enabled;
            networkInterface.isDhcpEnabled = rawObject.dhcp;

            if (rawObject.status) {
                networkInterface.type = rawObject.status.media_type;
                networkInterface.macAddress = rawObject.status["link-address"];
                networkInterface.linkState = rawObject.status.link_state;

                if (rawObject.status.aliases && rawObject.status.aliases.constructor === Array) {
                    var aliases = rawObject.status.aliases,
                        networkInterfaceAliases = [],
                        networkInterfaceAlias,
                        alias;

                    for (var i = 0, length = aliases.length; i < length; i++) {
                        alias = aliases[i];

                        //fixme: need investigating ->  multiple aliases ??
                        if (alias.family === "INET" || alias.family === "INET6") {
                            networkInterfaceAlias = new NetworkInterfaceAlias();

                            networkInterfaceAlias.ipAddress = alias.address;
                            networkInterfaceAlias.broadcast = alias.broadcast;
                            networkInterfaceAlias.netmask = alias.netmask;

                            networkInterfaceAliases.push(networkInterfaceAlias);
                        }
                    }

                    networkInterface.aliases = networkInterfaceAliases;
                }
            }

            return networkInterface;
        }
    }
});
