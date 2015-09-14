var MessageCommand = require("core/backend/message-command").MessageCommand;

var COOKIE_SESSION_NAME = 'free_nas_logged_user'; // todo -> move to configuration ?

exports.LoginController = {

    currentLoggedUser: {
        value: null,
        writable: true
    },

    tryReconnect: {
        value: function () {
            var token = this._getSessionCookie();

            if (token) {
                var app = this._application,
                    reconnectHandler = function () {
                        app.isReady = true;
                        app.dispatchEventNamed("connectionEstablished", true, true);

                    };

                app.isReady = false;
                app.controller.loginWithToken(token).then(reconnectHandler, reconnectHandler);
            }
        }
    },

    login: {
        value: function (_authType, _credentials) {
            var promise;

            if (typeof _authType === "string" && _credentials) {
                if (_authType === "userpass" && _credentials.constructor === Array) {
                    promise = this.loginWithCredentials(_credentials[0], _credentials[1]); // 0 -> username, 1 -> password

                } else if (_authType === "token" && typeof _credentials === "string") {
                    promise = this.loginWithToken(_credentials);
                }
            }

            if (!promise) {
                throw "wrong parameters given";
            }

            return promise;
        }
    },

    loginWithCredentials: {
        value: function (_username, _password) {
            var self = this;

            this._disconnectCurrentLoggedUser();

            return this._backend.send(new MessageCommand("rpc", "auth", {
                username : _username,
                password : _password

            })).then(function (response) {
                self._saveCurrentLoggedUser(response.data);

                return self.currentLoggedUser;
            });
        }
    },

    loginWithToken: {
        value: function (_token) {
            var self = this;

            this._disconnectCurrentLoggedUser();

            return this._backend.send(new MessageCommand("rpc", "auth_token", {token: _token})).then(function (response) {
                self._saveCurrentLoggedUser(response.data);

                return self.currentLoggedUser;
            });
        }
    },

    updateSessionToken: {
        value: function (_timestamp) {
            this.currentLoggedUser.tokenExpiredTime = _timestamp + this.currentLoggedUser.tokenValidTime * 1000;
            this._saveSessionCookie(this.currentLoggedUser.token, this.currentLoggedUser.tokenExpiredTime);
        }
    },

    _disconnectCurrentLoggedUser: {
        value: function () {
            if (this.currentLoggedUser) {
                //this._backend.logout();
                this._deleteSessionCookie();
                this.currentLoggedUser = null;
            }
        }
    },

    _saveCurrentLoggedUser: {
        value: function (_userData) {
            var tokenValidTime = _userData[1];

            this.currentLoggedUser = {
                token: _userData[0],
                tokenValidTime: tokenValidTime,
                tokenExpiredTime: Date.now() + tokenValidTime * 1000,
                name: _userData[2]
            };

            this._saveSessionCookie(this.currentLoggedUser.token, this.currentLoggedUser.tokenExpiredTime);
        }
    },

    _saveSessionCookie: {
        value: function (_token, _timeStamp) {
            this._saveCookie(COOKIE_SESSION_NAME, _token, _timeStamp);
        }
    },

    _deleteSessionCookie: {
        value: function () {
            this._deleteCookie(COOKIE_SESSION_NAME, "", -1);
        }
    },

    _deleteCookie: {
        value: function (name) {
            this._saveCookie(name , "", -1);
        }
    },

    _saveCookie: {
        value: function (_name, _value, _timeStamp) {
            if (typeof _name === "string" && typeof _value === "string") {
                var expires;

                _timeStamp = +_timeStamp;

                if (!isNaN(_timeStamp)) {
                    var date = new Date(_timeStamp);
                    expires = "; expires=" + date.toUTCString();

                } else {
                    expires = "";
                }

                document.cookie = _name + "=" + _value + expires + "; path=/";

            } else {
                throw "wrong parameters given";
            }
        }
    },

    _getSessionCookie: {
        value: function () {
            return this._getCookie(COOKIE_SESSION_NAME);
        }
    },

    _getCookie: {
        value: function (_name) {
            if (typeof _name === "string" && document.cookie.length > 0) {
                var startIndex = document.cookie.indexOf(_name + "="),
                    endIndex;

                if (startIndex !== -1) {
                    startIndex = startIndex + _name.length + 1;
                    endIndex = document.cookie.indexOf(";", startIndex);

                    if (endIndex == -1) {
                        endIndex = document.cookie.length;
                    }

                    return decodeURI(document.cookie.substring(startIndex, endIndex));
                }
            }

            return null;
        }
    }

};
