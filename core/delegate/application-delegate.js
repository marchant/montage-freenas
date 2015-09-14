var Configuration = require("core/configuration/configuration").Configuration,
    FreeNasController = require("core/controller/freenas-controller").FreeNasController;


// development purpose
window["__DEVELOPMENT_CONNECTION__"] = "freenas.local";


/**
 * @module ./application-delegate
 */
var ApplicationDelegate = exports.ApplicationDelegate = function ApplicationDelegate () {};


ApplicationDelegate.prototype.willFinishLoading = function (_app) {
    _app.configuration = new Configuration().init();
    _app.controller = new FreeNasController(_app);
    _app.isReady = true;

    //fixme: temporary
    var loggedUserHash = sessionStorage.getItem('free_nas_logged_user');

    if (loggedUserHash) {
        var loggedUser = JSON.parse(loggedUserHash);

        if (loggedUser && Date.now() < loggedUser.tokenTime) {
            _app.isReady = false;

            _app.controller.loginWithToken(loggedUser.token).then(function (response) {
                _app.isReady = true;
                _app.dispatchEventNamed("connectionEstablished", true, true);

            }, function () {
                _app.isReady = true;
                _app.dispatchEventNamed("connectionEstablished", true, true);
            });
        }
    }
};
