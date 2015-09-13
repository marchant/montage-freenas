var DataStream = require("montage-data/logic/service/data-stream").DataStream,
    NetworkInterface = require("core/model/network-interface").NetworkInterface;


exports.NetworkInterfaceController = {

    getNetworkInterfaceList: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(NetworkInterface.TYPE, _dataSource);
        }
    }

};
