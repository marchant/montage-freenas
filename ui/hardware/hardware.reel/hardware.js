var Component = require("montage/ui/component").Component;

/**
 * @class Hardware
 * @extends Component
 */
exports.Hardware = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.populateSystemInfo();
                this.populateDiskList();
            }
        }
    },

    system: {
        value: null
    },

    disks: {
        value: null
    },

    populateSystemInfo: {
        value: function () {
            var self = this;

            this.application.controller.getSystemInfo().then(function (_system) {
                self.system = _system;
            });
        }
    },

    populateDiskList: {
        value: function () {
            var self = this;

            this.application.controller.getDiskList().then(function (_disks) {
                self.disks = _disks;
            });
        }
    }

});
