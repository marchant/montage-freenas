var BackEndBridge = require("core/backend/backend-bridge").BackEndBridge,
    Configuration = require("core/configuration/configuration").Configuration,
    FreeNasController = require("core/controller/freenas-controller").FreeNasController;


// development purpose
window["__DEVELOPMENT_CONNECTION__"] = "freenas.local";


/**
 * @module ./application-delegate
 */
var ApplicationDelegate = exports.ApplicationDelegate = function ApplicationDelegate () {};


ApplicationDelegate.prototype.willFinishLoading = function (_app) {
    _app.configuration = new Configuration().init();
    _app.isReady = false;

    var backendBridge = new BackEndBridge();

    backendBridge.connect().then(function () {
        _app.controller = new FreeNasController(backendBridge, _app);

        //fixme: need to be removed, just waiting for connection UI
        // demo purpose
        _app.controller.login("userpass", ["root", "Montage"]).then(function (response) {
            _app.isReady = true;
            _app.dispatchEventNamed("connectionEstablished", true, true);
        });

    }, function (error) {
        //todo
    });
};
