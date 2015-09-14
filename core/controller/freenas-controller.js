var UserControllerDescriptor = require("core/controller/user-controller").UserController,
    SystemControllerDescriptor = require("core/controller/system-controller").SystemController,
    NetworkSettingControllerDescriptor = require("core/controller/network-setting-controller").NetworkSettingController,
    NetworkInterfaceControllerDescriptor = require("core/controller/network-interface-controller").NetworkInterfaceController,
    GroupControllerDescriptor = require("core/controller/group-controller").GroupController,
    FreeNasService = require("core/service/freenas-service").FreeNasService,
    FreeNasStore = require("core/store/freenas-store").FreeNasStore;

var FreeNasController = exports.FreeNasController = function FreeNasController (_backendBridge, _app) {
    this._backend = _backendBridge;
    this._application = _app;
    this._service = new FreeNasService().initWithBackendBridge(_backendBridge);
    this._store = new FreeNasStore( this._service);
};


Object.defineProperties(FreeNasController.prototype, UserControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, GroupControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, SystemControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, NetworkSettingControllerDescriptor);
Object.defineProperties(FreeNasController.prototype, NetworkInterfaceControllerDescriptor);
