var Component = require("montage/ui/component").Component;

/**
 * @class DnsServerListItem
 * @extends Component
 */
exports.DnsServerListItem = Component.specialize({

    handleDeleteAction: {
        value: function () {
            alert("User wants to delete " + this.ip);
        }
    }

});
