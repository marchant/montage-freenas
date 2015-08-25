/**
 * @module ui/main.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
        }
    },
    "disks": {
        value: [
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV0",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV0",
                    "id": "serial:WD-WCC4ENSDRSV0",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV0",
                "name": "/dev/da0",
                "path": "/dev/da0",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504530",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504530",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV1",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV1",
                    "id": "serial:WD-WCC4ENSDRSV1",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV1",
                "name": "/dev/da1",
                "path": "/dev/da1",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504531",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504531",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV2",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV2",
                    "id": "serial:WD-WCC4ENSDRSV2",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV2",
                "name": "/dev/da2",
                "path": "/dev/da2",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504532",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504532",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV3",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV3",
                    "id": "serial:WD-WCC4ENSDRSV3",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV3",
                "name": "/dev/da3",
                "path": "/dev/da3",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504533",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504533",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV4",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV4",
                    "id": "serial:WD-WCC4ENSDRSV4",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV4",
                "name": "/dev/da4",
                "path": "/dev/da4",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504534",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504534",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV5",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV5",
                    "id": "serial:WD-WCC4ENSDRSV5",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV5",
                "name": "/dev/da5",
                "path": "/dev/da5",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504535",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504535",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV6",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV6",
                    "id": "serial:WD-WCC4ENSDRSV6",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV6",
                "name": "/dev/da6",
                "path": "/dev/da6",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504536",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504536",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV7",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV7",
                    "id": "serial:WD-WCC4ENSDRSV7",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV7",
                "name": "/dev/da7",
                "path": "/dev/da7",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504537",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504537",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV8",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV8",
                    "id": "serial:WD-WCC4ENSDRSV8",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV8",
                "name": "/dev/da8",
                "path": "/dev/da8",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504538",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504538",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV9",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV9",
                    "id": "serial:WD-WCC4ENSDRSV9",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV9",
                "name": "/dev/da9",
                "path": "/dev/da9",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504539",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504539",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV10",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV10",
                    "id": "serial:WD-WCC4ENSDRSV10",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV10",
                "name": "/dev/da10",
                "path": "/dev/da10",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045310",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045310",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV11",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV11",
                    "id": "serial:WD-WCC4ENSDRSV11",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV11",
                "name": "/dev/da11",
                "path": "/dev/da11",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045311",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045311",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV12",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV12",
                    "id": "serial:WD-WCC4ENSDRSV12",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV12",
                "name": "/dev/da12",
                "path": "/dev/da12",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045312",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045312",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV13",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV13",
                    "id": "serial:WD-WCC4ENSDRSV13",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV13",
                "name": "/dev/da13",
                "path": "/dev/da13",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045313",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045313",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV14",
                "controller": {
                    "controller-unit": 1,
                    "path-id": 1,
                    "serial": "WD-WCC4ENSDRSV14",
                    "id": "serial:WD-WCC4ENSDRSV14",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV14",
                "name": "/dev/da14",
                "path": "/dev/da14",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045314",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045314",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Western Digital",
                    "description": "WDC WD40EFRX-68WT0N0",
                    "model": "WDC WD40EFRX-68WT0N0",
                    "max-rotation": 5400,
                    "is-ssd": false,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 4000787030016,
                "serial": "WD-WCC4ENSDRSV15",
                "controller": {
                    "controller-unit": 2,
                    "path-id": 2,
                    "serial": "WD-WCC4ENSDRSV15",
                    "id": "serial:WD-WCC4ENSDRSV15",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:WD-WCC4ENSDRSV15",
                "name": "/dev/da15",
                "path": "/dev/da15",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d050995045315",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d050995045315",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Samsung",
                    "description": "16GB SATA Flash Drive",
                    "model": "16GB SATA Flash Drive",
                    "is-ssd": true,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 16013377536,
                "serial": "B0614482400700000390",
                "controller": {
                    "controller-unit": 3,
                    "path-id": 3,
                    "serial": "B0614482400700000390",
                    "id": "serial:B0614482400700000390",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:B0614482400700000390",
                "name": "/dev/da16",
                "path": "/dev/da16",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504530",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504530",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "Samsung",
                    "description": "16GB SATA Flash Drive",
                    "model": "16GB SATA Flash Drive",
                    "is-ssd": true,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 16013377536,
                "serial": "B0614482400700000391",
                "controller": {
                    "controller-unit": 3,
                    "path-id": 3,
                    "serial": "B0614482400700000391",
                    "id": "serial:B0614482400700000391",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:B0614482400700000391",
                "name": "/dev/da17",
                "path": "/dev/da17",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504531",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504531",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "OCZ",
                    "description": "FreeNAS Mini ZIL",
                    "model": "FreeNAS Mini ZIL rev. 2",
                    "is-ssd": true,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 8006688768,
                "serial": "A19D1011216008540",
                "controller": {
                    "controller-unit": 4,
                    "path-id": 4,
                    "serial": "A19D1011216008540",
                    "id": "serial:A19D1011216008540",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:A19D1011216008540",
                "name": "/dev/da18",
                "path": "/dev/da18",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504530",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504530",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            },
            {
                "status": {
                    "manufacturer": "OCZ",
                    "description": "FreeNAS Mini ZIL",
                    "model": "FreeNAS Mini ZIL rev. 2",
                    "is-ssd": true,
                    "sectorsize": 512,
                    "smart-enabled": true,
                    "smart-status": "PASS",
                    "smart-capable": true,
                    "schema": "GPT"
                },
                "mediasize": 8006688768,
                "serial": "A19D1011216008541",
                "controller": {
                    "controller-unit": 4,
                    "path-id": 4,
                    "serial": "A19D1011216008541",
                    "id": "serial:A19D1011216008541",
                    "target-id": 0,
                    "controller-name": "ahcich",
                    "bus-id": 0,
                    "target-lun": 0
                },
                "id": "serial:A19D1011216008541",
                "name": "/dev/da19",
                "path": "/dev/da19",
                "swap-partition-uuid": "7abad094-2438-11e5-b86d-d05099504531",
                "swap-partition-path": "/dev/gptid/7abad094-2438-11e5-b86d-d05099504531",
                "smart-status": "PASS",
                "smart-capable": true,
                "updated-at": 1440459600,
                "created-at": 1440459600,
                "online": true,
                "smart-statistics": {
                    "Temperature_Celcius": 29,
                    "Power_On_Hours": 1200,
                    "Load_CycleCount": 150,
                    "Reallocated_Sector_Ct": 0
                }
            }
        ]
    }

});
