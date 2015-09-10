/**
 * @module ui/disk-item.reel
 */
var Component = require("montage/ui/component").Component;
var ByteCalc = require("core/ByteCalc");

/**
 * @class DiskItem
 * @extends Component
 */
exports.DiskItem = Component.specialize(/** @lends DiskItem# */ {
    constructor: {
        value: function DiskItem() {
            this.super();
            this.classList.add("disk-icon");
        }
    },
    "_disk": {
        value: null
    },
    "disk": {
        get: function() {
            return this._disk;
        },
        set: function(value) {
            if(this._disk !== value) {
                this._disk = value;
                if(value) console.log(value.path);
                this.needsDraw = true;
            }
        }
    },

    "mediaSizeDisplay": {
        
        //ByteCalc.humanize( disk.mediasize
        //, { roundMode: this.props.roundMode }
        //)
    },
    "path": {
        value:null
    },
    "roundMode": {
        value: "whole"
    },
    "draw": {
        value: function() {
            var disk = this.disk;
            
            if ( disk[ "smart-status" ] === "PASS" ) {
                this.classList.add( "smart-pass" );
            } else if ( disk[ "smart-status"] === "WARN" ) {
                this.classList.add( "smart-warn" );
            } else if ( disk[ "smart-status" ] === "FAIL" ) {
                this.classList.add( "smart-fail" );
            }

            if ( disk[ "smart-statistics"][ "Temperature_Celcius" ] > 39 ) {
                this.classList.add( "temp-overheat" );
            } else if ( disk[ "smart-statistics"][ "Temperature_Celcius" ] <= 39
                       && disk[ "smart-statistics"][ "Temperature_Celcius" ] > 36 ) {
                this.classList.add( "temp-warn" );
            }

        }
        
    }
});
