var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    AbstractModel = require("core/model/abstract-model").AbstractModel,
    ByteCalc = require("core/utility/ByteCalc");

/**
 * @class System
 */
var System = exports.System = function System () {};

System._type = null;

Object.defineProperty(System, "TYPE", {
    get: function () {
        if (!this._type) {
            this._type = new ObjectDescriptor;
            this._type.name = "System";
            this._type.prototype = this.prototype;
        }

        return this._type;
    }
});

System.prototype= new AbstractModel();

System.prototype._memory = 0;
System.prototype._cpu = null;
System.prototype._language = null;
System.prototype._timezone = null;
System.prototype._hostname = null;
System.prototype._consoleKeymap = null;
System.prototype.syslogServer = null;
System.prototype.humanReadableMemorySize = 0;


Object.defineProperties(System.prototype, {

    cpu: {
        set: function (_cpu) {
            if (_cpu && typeof _cpu === "object" && _cpu !== this._cpu) {
                var cpu = this._cpu || {},
                    model = _cpu.cpu_model,
                    frequency = null;

                if (typeof model === "string") {
                    var data = model.match(/([0-9\.]+GHz)/gi);

                    if (data) {
                        frequency = data[0];
                    }
                }

                cpu.cores =_cpu.cpu_cores;
                cpu.model = model;
                cpu.frequency = frequency;

                this._cpu = cpu;
            }

        },get: function () {
            return this._cpu;
        },
        configurable: true
    },

    memorySize: {
        set: function (_memory) {
            _memory = +_memory;

            if (!isNaN(_memory) && _memory !== this._memory) {
                this._memory = _memory;
                this.humanReadableMemorySize = ByteCalc.humanize(_memory, {roundMode: "whole"});
            }
        },
        get: function () {
            return this._memory;
        },
        configurable: true
    },

    language: {
        set: function (_language) {
            if (typeof _language === "string" && this._language !== _language) {
                this._language = _language;
            }
        },
        get: function () {
            return this._language;
        },
        configurable: true
    },

    timezone: {
        set: function (_timezone) {
            if (typeof _timezone === "string" && this._timezone !== _timezone) {
                this._timezone = _timezone;
            }
        },
        get: function () {
            return this._timezone;
        },
        configurable: true
    },

    hostname: {
        set: function (_hostname) {
            if (typeof _hostname === "string" && this._hostname !== _hostname) {
                this._hostname = _hostname || null;
            }
        },
        get: function () {
            return this._hostname;
        },
        configurable: true
    },

    consoleKeymap: {
        set: function (_consoleKeymap) {
            if (typeof _consoleKeymap === "string" && this._consoleKeymap !== _consoleKeymap) {
                this._consoleKeymap = _consoleKeymap;
            }
        },
        get: function () {
            return this._consoleKeymap;
        },
        configurable: true
    }

});
