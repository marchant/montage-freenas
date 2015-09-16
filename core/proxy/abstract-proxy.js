var AbstractProxy = exports.AbstractProxy = function AbstractProxy () {};

AbstractProxy.prototype.isDirty = false;

Object.defineProperties(AbstractProxy.prototype,  {

    _updateValue: {
        value: function (object, key, value) {
            var previousValue = this[key];

            Object.getOwnPropertyDescriptor(object, key).set.call(this, value);

            if (previousValue !== this[key]) {
                this.isDirty = true;
            }
        }
    }

});
