var MessageCommand = exports.MessageCommand = function (_namespace, _name, _args) {
    this.namespace = _namespace;
    this.name = _name;
    this.args = _args;
};

MessageCommand.prototype.id = null;
MessageCommand.prototype.timeout = 5000;

MessageCommand.prototype.toJSON = function  () {
    return JSON.stringify({
        namespace: this.namespace,
        name: this.name,
        id: this.id,
        args: this.args
    });
};
