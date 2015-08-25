// BYTE CALCULATOR
// ===============
// Set of common tools used to convert units for data.

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UNITS = ["K", "M", "G", "T", "P", "E", "Z"];
var METRIC_PREFIX = ["kilo", "mega", "giga", "tera", "peta", "exa", "zetta"];
var IEC_PREFIX = ["kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi"];

var ByteCalc = (function () {
  function ByteCalc() {
    _classCallCheck(this, ByteCalc);
  }

  _createClass(ByteCalc, null, [{
    key: "convertString",

    // Convert a string that looks like "10KB" or "117 kibibytes" into a Number
    // equal to the equivalent number of bytes. This is a counterpart to the
    // humanize() method.
    value: function convertString(size) {
      var output = undefined;

      if (typeof size === "string") {
        var parsedSize = size.replace(/[^a-z0-9.]/gi, "").split(/([a-z]+)/gi, 2);

        var quantity = Array.isArray(parsedSize) && parsedSize[0] ? Number(parsedSize[0]) : null;

        var units = Array.isArray(parsedSize) && parsedSize[1] ? String(parsedSize[1]) : null;

        output = this.toBytes.call(this, quantity, units);
      } else if (typeof size === "number") {
        output = Math.max(size, 0);
      } else {
        console.warn("Provided size \"" + size + "\" must be a number or a string");
        output = 0;
      }

      return output;
    }

    // Converts between an abbreviation like "KiB" and the long form name
    // (kibibytes). This is only useful for GUI display logic and should not be
    // overloaded to perform actual conversions.
  }, {
    key: "getUnitName",
    value: function getUnitName(abbr) {
      if (typeof abbr !== "string") {
        throw new Error("ByteCalc.getUnitName only accepts strings: use an " + "abbreviation like 'KB', or 'KiB'");
      } else {
        var names = undefined;
        var type = this.determineFormat(abbr);

        if (type === "IEC") {
          names = IEC_PREFIX;
        } else if (type === "METRIC") {
          names = METRIC_PREFIX;
        }

        return names[UNITS.indexOf(abbr[0])] + "bytes";
      }
    }

    // Conversely, this gets the abbreviation, given a long form name
    // ( "kibibytes" becomes "KiB" ).
  }, {
    key: "getUnitAbbr",
    value: function getUnitAbbr(name) {
      if (typeof name !== "string") {
        throw new Error("ByteCalc.getUnitAbbr only accepts strings: use a " + "name like 'kilobytes', or 'mebibits'");
      } else {
        var suffix = undefined;
        var type = this.determineFormat(name);

        if (type === "IEC") {
          suffix = "iB";
        } else if (type === "METRIC") {
          suffix = "B";
        }

        return UNITS[UNITS.indexOf(name[0].toUpperCase())] + suffix;
      }
    }

    // Figure out the numeric base which corresponds to the string provided. This
    // helps back-convert from other units to bytes, since it will give you the
    // base to use in Math.log/Math.pow
  }, {
    key: "determineFormat",
    value: function determineFormat(units) {
      if (units && units.length === 3 | units.indexOf("bibyte") > -1) {
        return "IEC";
      } else {
        return "METRIC";
      }
      // Since this function might receive null or false, the fallthrough case is
      // to render everything in metric units (more likely). Unless these specific
      // targets are met, we won't use IEC.
    }

    // Converts from a known quantity and unit into bytes, which is the begining
    // of all other operations. This avoids the inherent awkwardness in trying to
    // turn TB into MiB, for instance
  }, {
    key: "toBytes",
    value: function toBytes(quantity, unit) {
      var format = this.determineFormat(unit);
      var identifier = unit ? unit[0].toUpperCase() : null;
      var exponent = UNITS.indexOf(identifier) + 1;

      var base = undefined;

      if (format === "METRIC") {
        base = 1000;
      } else if (format === "IEC") {
        base = 1024;
      }

      if (exponent > 0) {
        return Math.max(Number(quantity) * Math.pow(base, exponent), 0);
      } else {
        return Math.max(Number(quantity), 0);
      }
    }

    // Creates a human-friendly string out of a number of bytes. The output should
    // resemble something that any good file browser would show you, intelligently
    // rendering the biggest possible unit with two decimal places. This function
    // can be instructed to output metric or IEC (default is metric). The
    // `verbose` option will output "megabytes" instead of "MB"
  }, {
    key: "humanize",
    value: function humanize(bytes) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var _options$IEC = options.IEC;
      var IEC = _options$IEC === undefined ? false : _options$IEC;
      var _options$verbose = options.verbose;
      var verbose = _options$verbose === undefined ? false : _options$verbose;
      var _options$roundMode = options.roundMode;
      var roundMode = _options$roundMode === undefined ? null : _options$roundMode;

      var base = IEC ? 1024 : 1000;

      var exponent = Math.abs(bytes) < base ? 0 : Math.floor(Math.log(bytes) / Math.log(base));

      var finalSize = Math.max(bytes / Math.pow(base, exponent), 0);

      var units = "";
      var suffix = "";
      var output = "";

      if (verbose) {
        if (exponent > 0) {
          units = IEC ? IEC_PREFIX[exponent - 1] : METRIC_PREFIX[exponent - 1];
        }

        suffix = finalSize === 1 ? "byte" : "bytes";
      } else {
        suffix = "B";
        if (exponent > 0) {
          units = UNITS[exponent - 1];
          if (IEC) {
            // If we desire an abbreviated unit in IEC, our suffix needs an "i"
            suffix = "iB";
          }
        }
      }

      // If we're only on bytes or kilobytes, don't bother showing decimal places
      if (exponent <= 1) {
        output = Math.floor(finalSize);
      } else {
        if (roundMode === "whole") {
          output = finalSize.toFixed();
        } else if (typeof roundMode === "number") {
          output = finalSize.toFixed(roundMode);
        } else {
          output = finalSize.toFixed(2);
        }
      }

      return output + " " + units + suffix;
    }
  }]);

  return ByteCalc;
})();

exports["default"] = ByteCalc;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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RUFBRztBQUNsQixlQUFLLEdBQUcsR0FBRyxHQUNILFVBQVUsQ0FBRSxRQUFRLEdBQUcsQ0FBQyxDQUFFLEdBQzFCLGFBQWEsQ0FBRSxRQUFRLEdBQUcsQ0FBQyxDQUFFLENBQUM7U0FDdkM7O0FBRUQsY0FBTSxHQUFHLFNBQVMsS0FBSyxDQUFDLEdBQ2YsTUFBTSxHQUNOLE9BQU8sQ0FBQztPQUNsQixNQUFNO0FBQ0wsY0FBTSxHQUFHLEdBQUcsQ0FBQztBQUNiLFlBQUssUUFBUSxHQUFHLENBQUMsRUFBRztBQUNsQixlQUFLLEdBQUksS0FBSyxDQUFFLFFBQVEsR0FBRyxDQUFDLENBQUUsQ0FBQztBQUMvQixjQUFLLEdBQUcsRUFBRzs7QUFFVCxrQkFBTSxHQUFHLElBQUksQ0FBQztXQUNmO1NBQ0Y7T0FDRjs7O0FBR0QsVUFBSyxRQUFRLElBQUksQ0FBQyxFQUFHO0FBQ25CLGNBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFNBQVMsQ0FBRSxDQUFDO09BQ2xDLE1BQU07QUFDTCxZQUFLLFNBQVMsS0FBSyxPQUFPLEVBQUc7QUFDM0IsZ0JBQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUIsTUFBTSxJQUFLLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRztBQUMxQyxnQkFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUUsU0FBUyxDQUFFLENBQUM7U0FDekMsTUFBTTtBQUNMLGdCQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUNqQztPQUNGOztBQUVELGFBQU8sTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ3RDOzs7U0FsTEcsUUFBUTs7O3FCQXNMQyxRQUFRIiwiZmlsZSI6InV0aWxpdHkvQnl0ZUNhbGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCWVRFIENBTENVTEFUT1Jcbi8vID09PT09PT09PT09PT09PVxuLy8gU2V0IG9mIGNvbW1vbiB0b29scyB1c2VkIHRvIGNvbnZlcnQgdW5pdHMgZm9yIGRhdGEuXG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBVTklUUyA9IFsgXCJLXCIsIFwiTVwiLCBcIkdcIiwgXCJUXCIsIFwiUFwiLCBcIkVcIiwgXCJaXCIgXTtcbmNvbnN0IE1FVFJJQ19QUkVGSVggPVxuICBbIFwia2lsb1wiXG4gICwgXCJtZWdhXCJcbiAgLCBcImdpZ2FcIlxuICAsIFwidGVyYVwiXG4gICwgXCJwZXRhXCJcbiAgLCBcImV4YVwiXG4gICwgXCJ6ZXR0YVwiXG4gIF07XG5jb25zdCBJRUNfUFJFRklYID1cbiAgWyBcImtpYmlcIlxuICAsIFwibWViaVwiXG4gICwgXCJnaWJpXCJcbiAgLCBcInRlYmlcIlxuICAsIFwicGViaVwiXG4gICwgXCJleGJpXCJcbiAgLCBcInplYmlcIlxuICBdO1xuXG5jbGFzcyBCeXRlQ2FsYyB7XG5cbiAgLy8gQ29udmVydCBhIHN0cmluZyB0aGF0IGxvb2tzIGxpa2UgXCIxMEtCXCIgb3IgXCIxMTcga2liaWJ5dGVzXCIgaW50byBhIE51bWJlclxuICAvLyBlcXVhbCB0byB0aGUgZXF1aXZhbGVudCBudW1iZXIgb2YgYnl0ZXMuIFRoaXMgaXMgYSBjb3VudGVycGFydCB0byB0aGVcbiAgLy8gaHVtYW5pemUoKSBtZXRob2QuXG4gIHN0YXRpYyBjb252ZXJ0U3RyaW5nICggc2l6ZSApIHtcbiAgICBsZXQgb3V0cHV0O1xuXG4gICAgaWYgKCB0eXBlb2Ygc2l6ZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGxldCBwYXJzZWRTaXplID0gc2l6ZS5yZXBsYWNlKCAvW15hLXowLTkuXS9naSwgXCJcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoIC8oW2Etel0rKS9naSwgMiApO1xuXG4gICAgICBsZXQgcXVhbnRpdHkgPSBBcnJheS5pc0FycmF5KCBwYXJzZWRTaXplIClcbiAgICAgICAgICAgICAgICAgICAgICYmIHBhcnNlZFNpemVbMF1cbiAgICAgICAgICAgICAgICAgICA/IE51bWJlciggcGFyc2VkU2l6ZVswXSApXG4gICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICBsZXQgdW5pdHMgPSBBcnJheS5pc0FycmF5KCBwYXJzZWRTaXplIClcbiAgICAgICAgICAgICAgICAgICYmIHBhcnNlZFNpemVbMV1cbiAgICAgICAgICAgICAgICA/IFN0cmluZyggcGFyc2VkU2l6ZVsxXSApXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICBvdXRwdXQgPSB0aGlzLnRvQnl0ZXMuY2FsbCggdGhpcywgcXVhbnRpdHksIHVuaXRzICk7XG4gICAgfSBlbHNlIGlmICggdHlwZW9mIHNpemUgPT09IFwibnVtYmVyXCIgKSB7XG4gICAgICBvdXRwdXQgPSBNYXRoLm1heCggc2l6ZSwgMCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oIFwiUHJvdmlkZWQgc2l6ZSBcXFwiXCIgKyBzaXplXG4gICAgICAgICAgICAgICAgICArIFwiXFxcIiBtdXN0IGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICBvdXRwdXQgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvLyBDb252ZXJ0cyBiZXR3ZWVuIGFuIGFiYnJldmlhdGlvbiBsaWtlIFwiS2lCXCIgYW5kIHRoZSBsb25nIGZvcm0gbmFtZVxuICAvLyAoa2liaWJ5dGVzKS4gVGhpcyBpcyBvbmx5IHVzZWZ1bCBmb3IgR1VJIGRpc3BsYXkgbG9naWMgYW5kIHNob3VsZCBub3QgYmVcbiAgLy8gb3ZlcmxvYWRlZCB0byBwZXJmb3JtIGFjdHVhbCBjb252ZXJzaW9ucy5cbiAgc3RhdGljIGdldFVuaXROYW1lICggYWJiciApIHtcbiAgICBpZiAoIHR5cGVvZiBhYmJyICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIkJ5dGVDYWxjLmdldFVuaXROYW1lIG9ubHkgYWNjZXB0cyBzdHJpbmdzOiB1c2UgYW4gXCJcbiAgICAgICAgICAgICAgICAgICAgICsgXCJhYmJyZXZpYXRpb24gbGlrZSAnS0InLCBvciAnS2lCJ1wiXG4gICAgICAgICAgICAgICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmFtZXM7XG4gICAgICBsZXQgdHlwZSA9IHRoaXMuZGV0ZXJtaW5lRm9ybWF0KCBhYmJyICk7XG5cbiAgICAgIGlmICggdHlwZSA9PT0gXCJJRUNcIiApIHtcbiAgICAgICAgbmFtZXMgPSBJRUNfUFJFRklYO1xuICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gXCJNRVRSSUNcIiApIHtcbiAgICAgICAgbmFtZXMgPSBNRVRSSUNfUFJFRklYO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmFtZXNbIFVOSVRTLmluZGV4T2YoIGFiYnJbMF0gKSBdICsgXCJieXRlc1wiO1xuICAgIH1cbiAgfVxuXG4gIC8vIENvbnZlcnNlbHksIHRoaXMgZ2V0cyB0aGUgYWJicmV2aWF0aW9uLCBnaXZlbiBhIGxvbmcgZm9ybSBuYW1lXG4gIC8vICggXCJraWJpYnl0ZXNcIiBiZWNvbWVzIFwiS2lCXCIgKS5cbiAgc3RhdGljIGdldFVuaXRBYmJyICggbmFtZSApIHtcbiAgICBpZiAoIHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIkJ5dGVDYWxjLmdldFVuaXRBYmJyIG9ubHkgYWNjZXB0cyBzdHJpbmdzOiB1c2UgYSBcIlxuICAgICAgICAgICAgICAgICAgICAgKyBcIm5hbWUgbGlrZSAna2lsb2J5dGVzJywgb3IgJ21lYmliaXRzJ1wiXG4gICAgICAgICAgICAgICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3VmZml4O1xuICAgICAgbGV0IHR5cGUgPSB0aGlzLmRldGVybWluZUZvcm1hdCggbmFtZSApO1xuXG4gICAgICBpZiAoIHR5cGUgPT09IFwiSUVDXCIgKSB7XG4gICAgICAgIHN1ZmZpeCA9IFwiaUJcIjtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IFwiTUVUUklDXCIgKSB7XG4gICAgICAgIHN1ZmZpeCA9IFwiQlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gVU5JVFNbIFVOSVRTLmluZGV4T2YoIG5hbWVbMF0udG9VcHBlckNhc2UoKSApIF0gKyBzdWZmaXg7XG4gICAgfVxuICB9XG5cbiAgLy8gRmlndXJlIG91dCB0aGUgbnVtZXJpYyBiYXNlIHdoaWNoIGNvcnJlc3BvbmRzIHRvIHRoZSBzdHJpbmcgcHJvdmlkZWQuIFRoaXNcbiAgLy8gaGVscHMgYmFjay1jb252ZXJ0IGZyb20gb3RoZXIgdW5pdHMgdG8gYnl0ZXMsIHNpbmNlIGl0IHdpbGwgZ2l2ZSB5b3UgdGhlXG4gIC8vIGJhc2UgdG8gdXNlIGluIE1hdGgubG9nL01hdGgucG93XG4gIHN0YXRpYyBkZXRlcm1pbmVGb3JtYXQgKCB1bml0cyApIHtcbiAgICBpZiAoIHVuaXRzXG4gICAgICAgJiYgKCB1bml0cy5sZW5ndGggPT09IDNcbiAgICAgICAgICB8IHVuaXRzLmluZGV4T2YoIFwiYmlieXRlXCIgKSA+IC0xXG4gICAgICAgICAgKVxuICAgICAgICkge1xuICAgICAgcmV0dXJuIFwiSUVDXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIk1FVFJJQ1wiO1xuICAgIH1cbiAgICAvLyBTaW5jZSB0aGlzIGZ1bmN0aW9uIG1pZ2h0IHJlY2VpdmUgbnVsbCBvciBmYWxzZSwgdGhlIGZhbGx0aHJvdWdoIGNhc2UgaXNcbiAgICAvLyB0byByZW5kZXIgZXZlcnl0aGluZyBpbiBtZXRyaWMgdW5pdHMgKG1vcmUgbGlrZWx5KS4gVW5sZXNzIHRoZXNlIHNwZWNpZmljXG4gICAgLy8gdGFyZ2V0cyBhcmUgbWV0LCB3ZSB3b24ndCB1c2UgSUVDLlxuICB9XG5cbiAgLy8gQ29udmVydHMgZnJvbSBhIGtub3duIHF1YW50aXR5IGFuZCB1bml0IGludG8gYnl0ZXMsIHdoaWNoIGlzIHRoZSBiZWdpbmluZ1xuICAvLyBvZiBhbGwgb3RoZXIgb3BlcmF0aW9ucy4gVGhpcyBhdm9pZHMgdGhlIGluaGVyZW50IGF3a3dhcmRuZXNzIGluIHRyeWluZyB0b1xuICAvLyB0dXJuIFRCIGludG8gTWlCLCBmb3IgaW5zdGFuY2VcbiAgc3RhdGljIHRvQnl0ZXMgKCBxdWFudGl0eSwgdW5pdCApIHtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmRldGVybWluZUZvcm1hdCggdW5pdCApO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSB1bml0XG4gICAgICAgICAgICAgICAgICAgICA/IHVuaXRbMF0udG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuICAgIGNvbnN0IGV4cG9uZW50ID0gVU5JVFMuaW5kZXhPZiggaWRlbnRpZmllciApICsgMTtcblxuICAgIGxldCBiYXNlO1xuXG4gICAgaWYgKCBmb3JtYXQgPT09IFwiTUVUUklDXCIgKSB7XG4gICAgICBiYXNlID0gMTAwMDtcbiAgICB9IGVsc2UgaWYgKCBmb3JtYXQgPT09IFwiSUVDXCIgKSB7XG4gICAgICBiYXNlID0gMTAyNDtcbiAgICB9XG5cbiAgICBpZiAoIGV4cG9uZW50ID4gMCApIHtcbiAgICAgIHJldHVybiBNYXRoLm1heCggTnVtYmVyKCBxdWFudGl0eSApICogTWF0aC5wb3coIGJhc2UsIGV4cG9uZW50ICksIDAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KCBOdW1iZXIoIHF1YW50aXR5ICksIDAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGVzIGEgaHVtYW4tZnJpZW5kbHkgc3RyaW5nIG91dCBvZiBhIG51bWJlciBvZiBieXRlcy4gVGhlIG91dHB1dCBzaG91bGRcbiAgLy8gcmVzZW1ibGUgc29tZXRoaW5nIHRoYXQgYW55IGdvb2QgZmlsZSBicm93c2VyIHdvdWxkIHNob3cgeW91LCBpbnRlbGxpZ2VudGx5XG4gIC8vIHJlbmRlcmluZyB0aGUgYmlnZ2VzdCBwb3NzaWJsZSB1bml0IHdpdGggdHdvIGRlY2ltYWwgcGxhY2VzLiBUaGlzIGZ1bmN0aW9uXG4gIC8vIGNhbiBiZSBpbnN0cnVjdGVkIHRvIG91dHB1dCBtZXRyaWMgb3IgSUVDIChkZWZhdWx0IGlzIG1ldHJpYykuIFRoZVxuICAvLyBgdmVyYm9zZWAgb3B0aW9uIHdpbGwgb3V0cHV0IFwibWVnYWJ5dGVzXCIgaW5zdGVhZCBvZiBcIk1CXCJcbiAgc3RhdGljIGh1bWFuaXplICggYnl0ZXMsIG9wdGlvbnMgPSB7fSApIHtcbiAgICBsZXQgeyBJRUMgPSBmYWxzZSwgdmVyYm9zZSA9IGZhbHNlLCByb3VuZE1vZGUgPSBudWxsIH0gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgYmFzZSA9IElFQ1xuICAgICAgICAgICAgICAgPyAxMDI0XG4gICAgICAgICAgICAgICA6IDEwMDA7XG5cbiAgICBjb25zdCBleHBvbmVudCA9ICggTWF0aC5hYnMoIGJ5dGVzICkgPCBiYXNlIClcbiAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICA6IE1hdGguZmxvb3IoIE1hdGgubG9nKCBieXRlcyApIC8gTWF0aC5sb2coIGJhc2UgKSApO1xuXG4gICAgY29uc3QgZmluYWxTaXplID0gTWF0aC5tYXgoICggYnl0ZXMgLyBNYXRoLnBvdyggYmFzZSwgZXhwb25lbnQgKSApLCAwICk7XG5cbiAgICBsZXQgdW5pdHMgPSBcIlwiO1xuICAgIGxldCBzdWZmaXggPSBcIlwiO1xuICAgIGxldCBvdXRwdXQgPSBcIlwiO1xuXG4gICAgaWYgKCB2ZXJib3NlICkge1xuICAgICAgaWYgKCBleHBvbmVudCA+IDAgKSB7XG4gICAgICAgIHVuaXRzID0gSUVDXG4gICAgICAgICAgICAgID8gSUVDX1BSRUZJWFsgZXhwb25lbnQgLSAxIF1cbiAgICAgICAgICAgICAgOiBNRVRSSUNfUFJFRklYWyBleHBvbmVudCAtIDEgXTtcbiAgICAgIH1cblxuICAgICAgc3VmZml4ID0gZmluYWxTaXplID09PSAxXG4gICAgICAgICAgICAgPyBcImJ5dGVcIlxuICAgICAgICAgICAgIDogXCJieXRlc1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWZmaXggPSBcIkJcIjtcbiAgICAgIGlmICggZXhwb25lbnQgPiAwICkge1xuICAgICAgICB1bml0cyAgPSBVTklUU1sgZXhwb25lbnQgLSAxIF07XG4gICAgICAgIGlmICggSUVDICkge1xuICAgICAgICAgIC8vIElmIHdlIGRlc2lyZSBhbiBhYmJyZXZpYXRlZCB1bml0IGluIElFQywgb3VyIHN1ZmZpeCBuZWVkcyBhbiBcImlcIlxuICAgICAgICAgIHN1ZmZpeCA9IFwiaUJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlJ3JlIG9ubHkgb24gYnl0ZXMgb3Iga2lsb2J5dGVzLCBkb24ndCBib3RoZXIgc2hvd2luZyBkZWNpbWFsIHBsYWNlc1xuICAgIGlmICggZXhwb25lbnQgPD0gMSApIHtcbiAgICAgIG91dHB1dCA9IE1hdGguZmxvb3IoIGZpbmFsU2l6ZSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIHJvdW5kTW9kZSA9PT0gXCJ3aG9sZVwiICkge1xuICAgICAgICBvdXRwdXQgPSBmaW5hbFNpemUudG9GaXhlZCgpO1xuICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHJvdW5kTW9kZSA9PT0gXCJudW1iZXJcIiApIHtcbiAgICAgICAgb3V0cHV0ID0gZmluYWxTaXplLnRvRml4ZWQoIHJvdW5kTW9kZSApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gZmluYWxTaXplLnRvRml4ZWQoIDIgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0ICsgXCIgXCIgKyB1bml0cyArIHN1ZmZpeDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ5dGVDYWxjO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9