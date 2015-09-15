var AbstractDraggableComponent = require("core/drag-drop/abstract-draggable-component").AbstractDraggableComponent,
    Repetition = require("montage/ui/repetition.reel").Repetition,
    ByteCalc = require("core/utility/ByteCalc");

/**
 * @class Disk
 * @extends AbstractDraggableComponent
 */
exports.Disk = AbstractDraggableComponent.specialize({

    _disk: {
        value: null
    },

    disk: {
        get: function () {
            return this._disk;
        },
        set: function (value) {
            this._disk = value;
            if (value) {
                this.needsDraw = true;
            }
        }
    },

    _capacity: {
        value: null
    },

    capacity: {
        get: function () {
            return this._capacity;
        },
        set: function (value) {
            this._capacity = value;
            if (value) {
                this.formattedCapacity = ByteCalc.humanize(value, {roundMode: "whole"});
            } else {
                this.formattedCapacity = null;
            }
        }
    },

    draw: {
        value: function () {
            this.super();
            if (this._disk && !this._disk._originalParentComponent) {
                this._disk._originalParentComponent = this.parentComponent;
            }
        }
    },

    handleRemoveAction: {
        value: function (isNotAdding) {
            var parentComponent = this.parentComponent;

            if (isNotAdding !== true) {
                this._disk._originalParentComponent.contentController.add(this._disk);
            }
            parentComponent.contentController.delete(this._disk);
            if (!parentComponent.contentController.content.length &&
                parentComponent.parentComponent &&
                parentComponent.parentComponent.handleCloseAction) {
                parentComponent.parentComponent.handleCloseAction();
            }
        }
    }

});
