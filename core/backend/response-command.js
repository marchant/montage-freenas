var ResponseCommand = exports.ResponseCommand = function (_data, _rawResponse) {
    this.data = _data;
    this._rawResponse = _rawResponse;
};

ResponseCommand.prototype._rawResponse = null;
