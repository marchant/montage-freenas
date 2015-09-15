var AbstractDropZoneComponent = require("core/drag-drop/abstract-dropzone-component").AbstractDropZoneComponent,
    Repetition = require("montage/ui/repetition.reel").Repetition;

/**
 * @class Container
 * @extends AbstractDropZoneComponent
 */
exports.Container = AbstractDropZoneComponent.specialize({

    handleCloseAction: {
        value: function () {
            var length = this.repetition.iterations.length,
                i;

            for (i = length - 1; i >= 0; i--) {
                this.repetition.iterations[i]._childComponents[0].handleRemoveAction();
            }
            if (this.parentComponent instanceof Repetition) {
                this.parentComponent.contentController.delete(this.disks);
            }
        }
    },

    didComponentDrop: {
        value: function (component) {
            console.log("fpop");
            var parent = component.parentComponent;

            if (parent.contentController) {
                this.repetition.contentController.add(component.disk);
                component.handleRemoveAction(true);
                if (this.repetition.content.length === 1 &&
                    this.parentComponent &&
                    this.parentComponent instanceof Repetition &&
                    this.parentComponent.contentController.content[this.parentComponent.contentController.content.length - 1].length) {
                    this.parentComponent.contentController.push([]);
                }
            }
        }
    },

    _type: {
        value: "stripe"
    },

    type: {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this._computeSizes();
        }
    },

    _computeSizes: {
        value: function () {
            var baseSize = this.disks[0] ? this.disks[0].capacity || 0 : 0,
                i;

            for (i = 1; i < this.disks.length; i++) {
                if (this.disks[i].capacity < baseSize) {
                    baseSize = this.disks[i].capacity;
                }
            }
            switch (this.type) {
                case "stripe":
                    this.parity = 0;
                    this.usable = baseSize * this.disks.length;
                break;
                case "mirror":
                    this.parity = baseSize * (this.disks.length - 1);
                    this.usable = baseSize;
                break;
                case "raidz1":
                    this.parity = baseSize;
                    this.usable = baseSize * this.disks.length - this.parity;
                break;
                case "raidz2":
                    this.parity = baseSize * 2;
                    this.usable = baseSize * this.disks.length - this.parity;
                break;
                case "raidz3":
                    this.parity = baseSize * 3;
                    this.usable = baseSize * this.disks.length - this.parity;
                break;
                default:
                    this.parity = 0;
                    this.usable = baseSize;
                break;
            }
            /*usable = 0;
            parity = 0;
            for (i = 0; i < this.disks.length; i++) {
                usable += this.disks[i].capacity;
            }
            this.usable = usable;*/
        }
    },

    _allOptions: {
        value: [
            {
                label: "Stripe",
                value: "stripe"
            },
            {
                label: "Mirror",
                value: "mirror"
            },
            {
                label: "RAID-Z1",
                value: "raidz1"
            },
            {
                label: "RAID-Z2",
                value: "raidz2"
            },
            {
                label: "RAID-Z3",
                value: "raidz3"
            }
        ]
    },

    _length: {
        value: null
    },

    length: {
        get: function () {
            return this._length;
        },
        set: function (value) {
            var previousSelectedValue,
                options,
                i;

            this._length = value;
            if (this.disks) {
                this._computeSizes();
                previousSelectedValue = this.typeSelect.selectedValue;
                options = this._allOptions.slice(0, this.disks.length);
                this.typeSelect.options.swap(0, Infinity, options);
                if (previousSelectedValue && options.length) {
                    i = 0;
                    while (i < options.length && options[i].value !== previousSelectedValue) {
                        i++;
                    }
                    if (i === options.length) {
                        this.typeSelect.selectedValue = options[options.length - 1].value;
                    } else {
                        this.typeSelect.selectedValue = previousSelectedValue;
                    }
                } else {
                    this.typeSelect.selectedValue = "stripe";
                }
            }
        }
    }

});
