var Component = require("montage/ui/component").Component;

/**
 * @class SystemInfoWidget
 * @extends Component
 */
exports.SystemInfoWidget = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.refreshSystemInfo();
            }
        }
    },

    system: {
        value: null
    },

    refreshSystemInfo: {
        value: function () {
            var self = this;

            this.application.controller.getSystemInfo().then(function (_system) {
                self.system = _system;
            });
        }
    }

});
