var GroupStore = require("core/store/group-store").GroupStore,
    UserStore = require("core/store/user-store").UserStore,
    SystemStore = require("core/store/system-store").SystemStore,
    NetworkInterfaceStore = require("core/store/network-interface-store").NetworkInterfaceStore,
    NetworkSettingStore = require("core/store/network-setting-store").NetworkSettingStore;


var FreeNasStore = exports.FreeNasStore = function FreeNasStore (_service) {
    this._stores = Object.create(null);
    this._pendingFetchPromise = Object.create(null);
    this._service = _service;
};


FreeNasStore.STORES = {
    Group: GroupStore,
    User: UserStore,
    System: SystemStore,
    NetworkInterface: NetworkInterfaceStore,
    NetworkSetting: NetworkSettingStore
};


FreeNasStore.prototype._pendingFetchPromise = null;

FreeNasStore.prototype.getModelObjectList = function (_type) {
    var store = this._stores[_type.name];

    if (store) {
        return Promise.resolve(store.collection);
    }

    return this._fetchModelObjectList(_type);
};


FreeNasStore.prototype.findModelObjectWithID = function (_type, _id) {
    if (this._stores[_type.name]) {
        return this.findModelObjectWithSelector(_type, {id: _id});
    }

    var self = this;

    return this._fetchModelObjectList(_type).then(function () {
        return self.findModelObjectWithSelector(_type, {id: _id});

    }, function (error) {
        console.error(error)
    });
};


FreeNasStore.prototype.findModelObjectWithSelector = function (_type, _selector) {
    var store = this._stores[_type.name],
        model = null;

    if (store) {
        var collection = store.collection,
            selectorKeys = Object.keys(_selector),
            selectorObjectKey,
            currentModelObject,
            selectorPropertyMeetCount;

        for (var j = 0, length = collection.length; j < length && model === null; j++) {
            currentModelObject = collection[j];
            selectorPropertyMeetCount = 0;

            for (var i = 0, len = selectorKeys.length; i < len && model === null; i++) {
                selectorObjectKey = selectorKeys[i];

                if (currentModelObject[selectorObjectKey] === _selector[selectorObjectKey]) {
                    if (++selectorPropertyMeetCount === len) {
                        model = currentModelObject;
                    }
                }
            }
        }
    }

    return Promise.resolve(model);
};


FreeNasStore.prototype._saveCollection = function (_typeName, _collection) {
    var StoreConstructor = FreeNasStore.STORES[_typeName];

    if (!this._stores[_typeName] && StoreConstructor) {
        this._stores[_typeName] = new StoreConstructor(_collection);

        return true;
    }

    return false;
};


FreeNasStore.prototype._fetchModelObjectList = function (_type) {
    var typeName = _type.name;

    if (!this._pendingFetchPromise[typeName]) {
        var self = this;

        this._pendingFetchPromise[typeName] = new Promise(function (resolve, reject) {
            return self._service.getData(_type).then(function (_data) {
                self._saveCollection(typeName, _data);
                delete self._pendingFetchPromise[typeName];

                resolve(_data);

            }, function (error) {
                delete self._pendingFetchPromise[typeName];
                console.error(error);

                reject(error);
            });
        });
    }

    return this._pendingFetchPromise[typeName];
};
