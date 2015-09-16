var Component = require("montage/ui/component").Component,
    ByteCalc = require("core/utility/ByteCalc");

/**
 * @class DiskChart
 * @extends Component
 */
exports.DiskChart = Component.specialize({

    _usable: {
        value: null
    },

    usable: {
        get: function () {
            return this._usable;
        },
        set: function (value) {
            this._usable = value;
            if (this._isVisible && typeof value !== "undefined" && value !== null) {
                this.needsDraw = true;
            }
        }
    },

    _parity: {
        value: null
    },

    parity: {
        get: function () {
            return this._parity;
        },
        set: function (value) {
            this._parity = value;
            if (this._isVisible && typeof value !== "undefined" && value !== null) {
                this.needsDraw = true;
            }
        }
    },

    _isVisible: {
        value: true
    },

    isVisible: {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            this._isVisible = value;
            this.needsDraw = true;
        }
    },

    _pieWidth: {
        value: 26
    },

    color1: {
        value: "#7dab50"
    },

    color2: {
        value: "#4a7126"
    },

    draw: {
        value: function () {
            var context,
                usableToTotalRatio,
                angle;

            if (this._isVisible && this._usable !== null && this._parity !== null) {
                if (this._usable + this._parity > 0) {
                    this.formattedUsable = ByteCalc.humanize(this._usable);
                    this.formattedParity = ByteCalc.humanize(this._parity);
                    this._element.classList.add("DiskChart-isVisible");
                    context = this.pieCanvas.getContext("2d");
                    usableToTotalRatio = this.usable / (this.usable + this.parity);
                    angle = (usableToTotalRatio - .25) * Math.PI * 2;
                    this.pieCanvas.width = this._pieWidth * 2;
                    this.pieCanvas.height = this._pieWidth * 2;
                    context.beginPath();
                    context.arc(
                        this._pieWidth,
                        this._pieWidth,
                        this._pieWidth,
                        0,
                        Math.PI * 2);
                    context.lineTo(this._pieWidth, this._pieWidth);
                    context.fillStyle = this.color1;
                    context.fill();
                    context.beginPath();
                    context.arc(
                        this._pieWidth,
                        this._pieWidth,
                        this._pieWidth,
                        -.5 * Math.PI,
                        angle);
                    context.lineTo(this._pieWidth, this._pieWidth);
                    context.fillStyle = this.color2;
                    context.fill();
                } else {
                    this._element.classList.remove("DiskChart-isVisible");
                }
            } else {
                this._element.classList.remove("DiskChart-isVisible");
            }
        }
    }

});
