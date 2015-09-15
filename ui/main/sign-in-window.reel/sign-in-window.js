var Overlay = require("montage/ui/overlay.reel/overlay").Overlay,
    KeyComposer = require("montage/composer/key-composer").KeyComposer;

/**
 * @class SignInWindow
 * @extends Component
 */
exports.SignInWindow = Overlay.specialize({

    enterDocument: {
        value: function (_firstTime) {
            Overlay.enterDocument.call(this, _firstTime);

            if (_firstTime) {
                this._keyComposer = new KeyComposer();
                this._keyComposer.component = this;
                this._keyComposer.keys = "enter";
                this._keyComposer.identifier = "enter";
                this.addComposerForElement(this._keyComposer, window);

                var app = this.application;
                app.controller.signInWindow = this;

                if (!app.controller.currentLoggedUser) {
                    this.show();
                }
            }
        }
    },

    username: {
        value: null
    },

    password: {
        value: null
    },

    _dismissOnExternalInteraction: {
        value: false
    },

    _loginPromise: {
        value: false
    },

    handleKeyPress: {
        value: function(event) {
            if (event.identifier === "enter") {
                this.handleSignInAction(event);
            }
        }
    },

    show: {
        value: function() {
            var wasShown = this.isShown; // will be changed by `Overlay.prototype.show.call()`

            Overlay.prototype.show.call(this);

            if (!wasShown) {
                this.addEventListener("action", this, false);
            }
        }
    },


    hide: {
        value: function () {
            if (this.isShown) {
                this.removeEventListener("action", this, false);
                this.username = null;
                this.password = null;
            }

            Overlay.prototype.hide.call(this);
        }
    },

    handleSignInAction: {
        value: function () {
            if (!this._loginPromise) {
                var self = this;

                this._loginPromise = this.application.controller.loginWithCredentials(this.username, this.password).then(function () {
                    self._loginPromise = null;
                    self.application.controller.displayDashboard();
                    self.hide();

                }, function (error) {
                    if (error.code === 13) {
                        self.errorMessage = error.message;
                    }

                    self._loginPromise = null;
                });
            }
        }
    }

});
