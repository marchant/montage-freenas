var Component = require("montage/ui/component").Component;

/**
 * @class StorageConfig
 * @extends Component
 */
exports.StorageConfig = Component.specialize({

    enterDocument: {
        value: function () {
            this.application.storageConfig = this;
            this.updateTotals();
        }
    },

    updateTotals: {
        value: function () {
            var usable = 0,
                parity = 0,
                iterations,
                container,
                i;

            if (this.storageRepetition.iterations) {
                iterations = this.storageRepetition.iterations;
                for (i = 0; i < iterations.length; i++) {
                    if (iterations[i]._childComponents &&
                        (container = iterations[i]._childComponents[0])) {
                        if (typeof container.usable !== "undefined") {
                            usable += container.usable;
                            parity += container.parity;
                        }
                    }
                }
            }
            this.usable = usable;
            this.parity = parity;
        }
    },

    _storageRepetitionLength: {
        value: null
    },

    storageRepetitionLength: {
        get: function () {
            return this._storageRepetitionLength;
        },
        set: function (value) {
            var repetitionController,
                repetitionContent,
                i;

            this._storageRepetitionLength = value;
            if (typeof value === "number") {
                repetitionController = this.storageRepetition.contentController;
                repetitionContent = repetitionController.content;
                if (!repetitionContent.length || repetitionContent[repetitionContent.length - 1].length !== 0) {
                    repetitionController.add([]);
                }
            }
        }
    },

    handleCancelAction: {
        value: function () {
            this.storageSection.isShowingConfig = false;
        }
    }

});
