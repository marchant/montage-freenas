var Component = require("montage/ui/component").Component;

/**
 * @class Table
 * @extends Component
 */
exports.Table = Component.specialize({

    orderBy: {
        value: null
    },

    reversed: {
        value: false
    },

    clickedColumn: {
        set: function (value) {
            var self;

            if (value) {
                if (this.orderBy !== value.expression) {
                    this.orderBy = value.expression;
                    this.rowRepetition.contentController.sortPath = this.orderBy;
                    this.reversed = false;
                } else {
                    this.reversed = !this.reversed;
                }
                this.rowRepetition.contentController.reversed = this.reversed;
                self = this;
                setTimeout(function () {
                    self.headerRepetition.contentController.selection = [];
                }, 0);
            }
        }
    }

});
