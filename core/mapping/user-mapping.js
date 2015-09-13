var DataMapping = require("montage-data/logic/service/data-mapping").DataMapping,
    User = require("core/model/user").User;

exports.UserMapping = DataMapping.specialize({
    mapRawData: {
        value: function (rawObject) {
            var user = new User();

            user.username = rawObject.username;
            user.isBuiltIn = rawObject.builtin;
            user.dateCreated = rawObject["created-at"];
            user.email = rawObject.email;
            user.fullName = rawObject.full_name;
            user.groupID = rawObject.group;
            user.groups = rawObject.groups;
            user.attributes = rawObject.attributes;
            user.home = rawObject.home;
            user.id = rawObject.id;
            user.isLocked = rawObject.locked;
            user.isLogged = rawObject["logged-in"];
            user.isPasswordDisabled = rawObject.password_disabled;
            user.shell = rawObject.shell;
            user.sessions = rawObject.sessions;
            user.smbHash = rawObject.smbhash;
            user.shell = rawObject.shell;
            user.sshPublicKey = rawObject.sshpubkey;
            user.canSudo = rawObject.sudo;
            user.unixHash = rawObject.unixhash;
            user.dateUpdated = rawObject["updated-at"];

            return user;
        }
    }
});
