var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    Group = require("core/model/group").Group;

exports.GroupMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var group = new Group();

            group.name = rawObject.name;
            group.isBuiltIn = rawObject.builtin;
            group.dateCreated = rawObject["created-at"];
            group.members = rawObject.members;
            group.id = rawObject.id;
            group.canSudo = rawObject.sudo;
            group.dateUpdated = rawObject["updated-at"];

            return group;
        }
    }
});
