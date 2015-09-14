var ResponseCommand = exports.ResponseCommand = function (_rawResponse) {
    this.data = _rawResponse.args;
    this.timestamp = _rawResponse.timestamp * 1000;
    this._rawResponse = _rawResponse;
};

ResponseCommand.prototype._rawResponse = null;
