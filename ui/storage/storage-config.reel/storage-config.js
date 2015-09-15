var Component = require("montage/ui/component").Component;

/**
 * @class StorageConfig
 * @extends Component
 */
exports.StorageConfig = Component.specialize({

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
    }

});
