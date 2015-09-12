var Component = require("montage/ui/component").Component;

/**
 * @class Table
 * @extends Component
 */
exports.Table = Component.specialize({

    _initOrderBy: {
        value: function () {
            if (this._rowRepetitionController && this._columns && this._columns[0]) {
                this._orderBy = this._columns[0].expression;
                this._rowRepetitionController.sortPath = this._orderBy;
            }
        }
    },

    _columns: {
        value: null
    },

    columns: {
        get: function () {
            return this._columns;
        },
        set: function (value) {
            this._columns = value;
            this._initOrderBy();
        }
    },

    _rowRepetitionController: {
        value: null
    },

    rowRepetitionController: {
        get: function () {
            return this._rowRepetitionController;
        },
        set: function (value) {
            this._rowRepetitionController = value;
            this._initOrderBy();
        }
    },

    _orderBy: {
        value: null
    },

    _reversed: {
        value: false
    },

    activeColumn: {
        set: function (value) {
            var self;

            if (value) {
                if (this._orderBy !== value.expression) {
                    this._orderBy = value.expression;
                    this.rowRepetitionController.sortPath = this._orderBy;
                    this._reversed = false;
                } else {
                    this._reversed = !this._reversed;
                }
                this.rowRepetitionController.reversed = this._reversed;
            }
        }
    }

});
