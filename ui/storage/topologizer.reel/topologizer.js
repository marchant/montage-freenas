var Component = require("montage/ui/component").Component;

/**
 * @class Topologizer
 * @extends Component
 */
exports.Topologizer = Component.specialize({

    prepareForActivationEvents: {
        value: function () {
            this.triangleElement.addEventListener("mousedown", this, false);
        }
    },

    _computeBarycentricValues: {
        value: function (x, y) {
            if (this._width && this._height) {
                return [
                    1 - ((x * Math.sin(Math.PI / 3) - (y - this._height) * Math.cos(Math.PI / 3)) / this._height),
                    1 - (y / this._height),
                    1- (((this._width - x) * Math.sin(Math.PI / 3) - (y - this._height) * Math.cos(Math.PI / 3)) / this._height)
                ];
            } else {
                return [1/3, 1/3, 1/3];
            }
        }
    },

    _handlePosition: {
        value: null
    },

    _valuesInRange: {
        value: function (barycentricValues) {
            return (barycentricValues[0] >= 0 &&
                    barycentricValues[0] <= 1 &&
                    barycentricValues[1] >= 0 &&
                    barycentricValues[1] <= 1 &&
                    barycentricValues[2] >= 0 &&
                    barycentricValues[2] <= 1);
        }
    },

    handlePosition: {
        get: function () {
            return this._handlePosition;
        },
        set: function (value) {
            var barycentricValues,
                x, y, best;

            if (value) {
                barycentricValues = this._computeBarycentricValues(value.x, value.y);
                if (this._valuesInRange(barycentricValues)) {
                    this._handlePosition = value;
                } else {
                    best = {x: 0, distance: Infinity};
                    y = value.y;
                    if (y < 1) {
                        y = 1;
                    }
                    if (y >= this._height) {
                        y = this._height - 1;
                    }

                    // TODO: This should be optimised by line/line intersection

                    for (x = 0; x < this._width; x++) {
                        if (this._valuesInRange(this._computeBarycentricValues(x, y))) {
                            squaredDistance = (x - value.x) * (x - value.x);
                            if (squaredDistance < best.distance) {
                                best.distance = squaredDistance;
                                best.x = x;
                            }
                        }
                    }
                    this._handlePosition = {x: best.x, y: y};
                    barycentricValues = this._computeBarycentricValues(
                        this._handlePosition.x,
                        this._handlePosition.y
                    );
                }
                this.application.preventAnimation = true;
                this.topology.createTopology(
                    this.topology._calculatePreferences(
                        barycentricValues[0], barycentricValues[1], barycentricValues[2]
                    )
                );
                this.needsDraw = true;
            }
        }
    },

    handleMousedown: {
        value: function (event) {
            this._targePosition = {
                x: event.layerX,
                y: event.layerY
            };
            this.handlePosition = this._targePosition;
            this._pointerPosition = {
                x: event.pageX,
                y: event.pageY
            };
            document.addEventListener("mousemove", this, false);
            document.addEventListener("mouseup", this, false);
            event.preventDefault();
        }
    },

    handleMousemove: {
        value: function (event) {
            this._targePosition.x += event.pageX - this._pointerPosition.x;
            this._targePosition.y += event.pageY - this._pointerPosition.y;
            this.handlePosition = this._targePosition;
            this._pointerPosition = {
                x: event.pageX,
                y: event.pageY
            };
        }
    },

    handleMouseup: {
        value: function (event) {
            document.removeEventListener("mousemove", this, false);
            document.removeEventListener("mouseup", this, false);
        }
    },

    willDraw: {
        value: function () {
            this._width = this.triangleElement.clientWidth;
            this._height = this.triangleElement.clientHeight;
        }
    },

    draw: {
        value: function () {
            if (this._handlePosition) {
                this.handleElement.style.left = this._handlePosition.x + "px";
                this.handleElement.style.top = this._handlePosition.y + "px";
            }
        }
    },

    didDraw: {
        value: function () {
            this.application.preventAnimation = false;
        }
    }

});
