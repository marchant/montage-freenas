var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    System = require("core/model/system").System;

exports.SystemMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var system = new System();

            if (rawObject.hardwareInfo) {
                system.memorySize = rawObject.hardwareInfo.memory_size;
                system.cpu = rawObject.hardwareInfo;
            }

            if (rawObject.generalConfig) {
                system.language = rawObject.generalConfig.language;
                system.timezone = rawObject.generalConfig.timezone;
                system.syslogServer = rawObject.generalConfig.syslog_server;
                system.hostname = rawObject.generalConfig.hostname;
                system.consoleKeymap = rawObject.generalConfig.console_keymap;
            }

            return system;
        }
    }
});
