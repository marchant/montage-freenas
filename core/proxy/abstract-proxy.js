var AbstractProxy = exports.AbstractProxy = function AbstractProxy () {};

AbstractProxy.prototype.isDirty = false;
AbstractProxy.prototype._validity = null;
AbstractProxy.prototype.checkValidity = Function.noop;

Object.defineProperties(AbstractProxy.prototype,  {

    _updateValue: {
        value: function (object, key, value) {
            var previousValue = this[key];

            Object.getOwnPropertyDescriptor(object, key).set.call(this, value);

            if (previousValue !== this[key]) {
                this.isDirty = true;
            }

            this.checkValidity(key);
        }
    },

    validity: {
        get: function () {
            if (!this._validity) {
                this._validity = {};
            }

            return this._validity;
        },
        configurable: true
    }

});
