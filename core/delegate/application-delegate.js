var BackEndBridge = require("core/backend/backend-bridge").BackEndBridge,
    Configuration = require("core/configuration/configuration").Configuration,
    FreeNasController = require("core/controller/freenas-controller").FreeNasController,
    FreeNasService = require("core/service/freenas-service").FreeNasService,
    User = require("core/model/user").User;


// development purpose
window["__DEVELOPMENT_CONNECTION__"] = "172.16.64.128";


/**
 * @module ./application-delegate
 */
var ApplicationDelegate = exports.ApplicationDelegate = function ApplicationDelegate () {};


ApplicationDelegate.prototype.willFinishLoading = function (_app) {
    _app.configuration = new Configuration().init();

    var backendBridge = new BackEndBridge();

    backendBridge.connect().then(function () {
        _app.controller = new FreeNasController().initWithBackendBridge(backendBridge);
        _app.service = new FreeNasService().initWithBackendBridge(backendBridge);

        // demo purpose
        _app.controller.login("userpass", ["root", "Montage"]).then(function (response) {
            console.log("root logged!");
        });

    }, function (error) {
        //todo
    });
};
