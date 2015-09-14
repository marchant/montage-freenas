var MessageCommand = require("core/backend/message-command").MessageCommand,
    User = require("core/model/user").User;


exports.UserController = {

    currentLoggedUser: {
        value: null
    },

    getUserList: {
        value: function () {
            return this._store.getModelObjectList(User.TYPE);
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

    _disconnectCurrentLoggedUser: {
        value: function () {

            if (this.currentLoggedUser) {
                //this._backend.logout();
                this.currentLoggedUser = null;
            }
        }
    },

    _saveCurrentLoggedUser: {
        value: function (_userData) {
            this.currentLoggedUser = {
                token: _userData[0], // -> assuming
                tokenTime: _userData[1], // -> assuming
                name: _userData[2]
            };
        }
    }

};
