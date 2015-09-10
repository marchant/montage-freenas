var DataService = require("montage-data/logic/service/data-service").DataService;

exports.AbstractDataService = DataService.specialize({

    initWithBackendBridge: {
        value: function (_backendBridge) {
            this._backend = _backendBridge;

            return this;
        }
    },

    _backend: {
        value: null
    }

});
