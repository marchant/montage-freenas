var Component = require("montage/ui/component").Component;

/**
 * @class Settings
 * @extends Component
 */
exports.Settings = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.populateSystemSettingForm();
            }
        }
    },

    systemSetting: {
        value: null
    },

    populateSystemSettingForm: {
        value: function () {
            var self = this;

            this.application.controller.getSystemSetting().then(function (_systemSetting) {
                self.systemSetting = _systemSetting;
            });
        }
    }

});
