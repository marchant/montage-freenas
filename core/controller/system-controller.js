var DataStream = require("montage-data/logic/service/data-stream").DataStream,
    System = require("core/model/system").System;


exports.SystemController = {

    getSystemInfo: {
        value: function (_dataSource) {
            if (!_dataSource) {
                _dataSource = new DataStream();
            }

            return this._service.getData(System.TYPE, _dataSource).then(function (data) {
                return data[0]; //todo Needs discussion with Charles.
            });
        }
    }

};
