exports.WebSocketConfiguration = {

    WEB_SOCKET_PROTOCOL: {
        value: null,
        writable: true
    },

    WEB_SOCKET_HOST: {
        value: null,
        writable: true
    },

    WEB_SOCKET_PORT: {
        value: null,
        writable: true
    },

    WEB_SOCKET_PATH: {
        value: null,
        writable: true
    },

    WEB_SOCKET_MODE: {
        value: null,
        writable: true
    },

    WEB_SOCKET_URL: {
        value: null,
        writable: true
    },

    WEB_SOCKET_COMMAND_TIMEOUT_DEFAULT: {
        value: 5000, // -> ms
        writable: true
    },

    _initWebSocketConfigurationWithTarget: {
        value: function (_target) {
            var protocol, host, port, path, mode;

            switch (_target) {
                case "self":
                    protocol = (window.location.protocol === "https:") ? "wss://" : "ws://";
                    host = document.domain;
                    port = "5000";
                    path = "/socket";
                    mode = "STANDARD";
                    break;

                case "SIMULATION_MODE":
                    protocol = "ws://";
                    host  = document.domain;
                    port = "4444";
                    path = "/simulator";
                    mode = "SIMULATION_MODE";
                    break;

                default:
                    protocol = "ws://";
                    host = _target;
                    port = "5000";
                    path = "/socket";
                    mode = "CONNECT_TO_TARGET";
                    break;
            }

            this.WEB_SOCKET_PROTOCOL = protocol;
            this.WEB_SOCKET_HOST = host;
            this.WEB_SOCKET_PORT = port;
            this.WEB_SOCKET_PATH = path;
            this.WEB_SOCKET_MODE = mode;
            this.WEB_SOCKET_URL = protocol + host + ":" + port + path;
        }
    }

};
