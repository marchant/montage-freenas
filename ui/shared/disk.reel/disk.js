var AbstractDraggableComponent = require("core/drag-drop/abstract-draggable-component").AbstractDraggableComponent,
    Repetition = require("montage/ui/repetition.reel").Repetition,
    ByteCalc = require("core/utility/ByteCalc");

/**
 * @class Disk
 * @extends AbstractDraggableComponent
 */
exports.Disk = AbstractDraggableComponent.specialize({

    enterDocument: {
        value: function (isFirstTime) {
            AbstractDraggableComponent.prototype.enterDocument.call(this, isFirstTime);
            if (!this.application.preventAnimation) {
                this.classList.add("Disk-enter");
            } else {
                this.classList.remove("Disk-enter");
            }
        }
    },

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
                if (value.smartStatus !== this._smartStatus) {
                    switch (this._smartStatus) {
                        case "WARN":
                            this.classList.remove("Disk-warning");
                        break;
                        case "FAIL":
                            this.classList.remove("Disk-fail");
                        break;
                    }
                    this._smartStatus = value._smartStatus;
                    switch (this._smartStatus) {
                        case "WARN":
                            this.classList.add("Disk-warning");
                        break;
                        case "FAIL":
                            this.classList.add("Disk-fail");
                        break;
                    }
                }
                if (value.type !== this._type) {
                    this._type = value.type;
                    if (this._type === "ssd") {
                        this.classList.add("Disk-isSsd");
                    } else {
                        this.classList.remove("Disk-isSsd");
                    }
                }
                if (this._capacity !== value.capacity) {
                    this._capacity = value.capacity;
                    this._needsUpdateCapacity = true;
                    this.needsDraw = true;
                }
                if (this._name !== value.name) {
                    this._name = value.name;
                    this._needsUpdateName = true;
                    this.needsDraw = true;
                }
            }
        }
    },

    _needsUpdateCapacity: {
        value: false
    },

    _needsUpdateName: {
        value: false
    },

    _smartStatus: {
        value: "PASS"
    },

    _type: {
        value: "hdd"
    },

    draw: {
        value: function () {
            AbstractDraggableComponent.prototype.draw.call(this);
            if (this._needsUpdateCapacity) {
                this.capacityElement.textContent = ByteCalc.humanize(this._capacity, {roundMode: "whole"});
                this._needsUpdateCapacity = false;
            }
            if (this._needsUpdateName) {
                this.nameElement.textContent = this._name;
                this._needsUpdateName = false;
            }
        }
    },

    handleRemoveAction: {
        value: function (isNotAdding) {
            var parentComponent = this.parentComponent;

            if (isNotAdding !== true) {
                this._disk.origin.push(this._disk);
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
