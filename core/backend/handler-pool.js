/**
 * @constructor HandlerPool
 *
 * @description Contains all the pending promise handlers (commands) that have been sent to the server.
 * Those pending handlers will be removed from this pool when the command will have been resolved or when their timeout will occur.
 */
var HandlerPool = exports.HandlerPool = function HandlerPool () {};


HandlerPool.prototype._generateUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g
        , function ( c ) {
            var r = Math.random() * 16 | 0;
            var v = ( c === "x" ) ? r : ( r & 0x3 | 0x8 );

            return v.toString( 16 );
        }
    );
};


/**
 * @function
 * @public
 *
 * @param {Promise} handler - A Promise Object.
 *
 * @description Adds a handler to the pool.
 *
 * @example
 * var handlerPool = new HandlerPool();
 * var promise = new Promise();
 * var uid = handlerPool.addHandler(promise);
 *
 * @returns {Number} returns an unique ID.
 */
HandlerPool.prototype.addHandler = function (handler) {
    var uid = this._generateUUID();
    this[uid] = handler;

    return uid;
};


/**
 * @function
 * @public
 *
 * @param {Number} _uuid - An unique ID.
 *
 * @description Releases a handler from the pool with its unique ID.
 *
 * @example
 * var handlerPool = new HandlerPool();
 * var promise = new Promise();
 * var uid = handlerPool.addHandler(promise);
 * var handler = handlerPool.removeHandler(uid);
 *
 * @returns {Promise} returns the released handler.
 */
HandlerPool.prototype.releaseHandler = function (_uuid) {
    var handler;

    if ((typeof _uuid === "string" || typeof _uuid === "number") && this[_uuid]) {
        handler = this[_uuid];

        delete this[_uuid];
    }

    return handler;
};


HandlerPool.prototype.clear = function () {
    var keys = Object.keys(this);

    for (var i = 0, length = keys.length ; i < length; i++) {
        delete this[keys[i]];
    }
};

