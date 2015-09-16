var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    SystemSettingModel = require("core/model/system-setting"),
    ManagementConnectionSetting = SystemSettingModel.ManagementConnectionSetting,
    OperatingSystemSetting = SystemSettingModel.OperatingSystemSetting,
    SystemSetting = SystemSettingModel.SystemSetting,
    ConsoleSetting = SystemSettingModel.ConsoleSetting;


exports.SystemSettingMapping = DataMapping.specialize({

    mapRawData: {
        value: function (rawObject) {
            var systemSetting = new SystemSetting(),
                advancedSetting = rawObject.advancedSetting,
                managementConnection = rawObject.managementConnection;

            if (advancedSetting) {
                var operatingSystemSetting = new OperatingSystemSetting(),
                    consoleSetting = new ConsoleSetting();

                operatingSystemSetting.isAutotuneEnabled = advancedSetting.autotune;
                operatingSystemSetting.isConsoleCLIEnabled = advancedSetting.console_cli;
                operatingSystemSetting.isPowerdEnabled = advancedSetting.powerd;
                operatingSystemSetting.isAutoUploadCrashEnabled = advancedSetting.uploadcrash;
                operatingSystemSetting.swapOnDrive = advancedSetting.swapondrive;

                consoleSetting.isSerialConsoleEnabled = advancedSetting.serial_console;
                consoleSetting.serialPort = advancedSetting.serial_port;
                consoleSetting.serialSpeed = advancedSetting.serial_speed;
                consoleSetting.isConsoleScreenSaverEnabled = advancedSetting.console_screensaver;

                systemSetting.operatingSystemSetting = operatingSystemSetting;
                systemSetting.consoleSetting = consoleSetting;
            }

            if (managementConnection) {
                var managementConnectionSetting = new ManagementConnectionSetting(),
                    protocol = managementConnection.webui_protocol;

                managementConnectionSetting.serial_console = managementConnection.webui_http_port;
                managementConnectionSetting.serial_console = managementConnection.webui_http_redirect_https;
                managementConnectionSetting.serial_console = managementConnection.webui_https_certificate;
                managementConnectionSetting.serial_console = managementConnection.webui_https_port;
                managementConnectionSetting.serial_console = protocol && protocol.length ? protocol[0] : null;

                systemSetting.managementConnectionSetting = managementConnectionSetting;
            }

            return systemSetting;
        }
    }

});
