const mongoose = require("mongoose")

const guildSchemas = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: "!",
    },
    defaultRole: {
        type: String,
        required: false,
    },
    // guild channels
    memberLogChannel: {
        type: String,
        required: false,
    },
    logChannel: {
        type: String,
        required: false,
    },
    welcomeMessage : {
        type : String,
        required: false , 
        default : "Welcome To Our Server Mate "
    },
    goodByeMessage : {
        type : String,
        required: false , 
        default : "GoodBye Mate Have A nice Time"
    },
    welcomeBg : {
        type : String,
        required: false , 
        default : "https://cdn.discordapp.com/attachments/800006985529556996/831450693096570900/c5a04a63989f02b8c6dd2343b4e9a2cd.jpg"
    },
    language : {
        type : String,
        required: false , 
        default : "en"
    },
    bumpChannelServers: {
        type: String,
        required: false,

    },
    bumpIconServers: {
        type: String,
        required: false,

    },
    bumpChannelBots: {
        type: String,
        required: false,

    },
    // guild Bump Channels server settings
    bumpServerDescription: {
        type: String,
        required: false,

    },
    bumpServerInviteurl: {
        type: String,
        required: false,

    },
})
module.exports = mongoose.model("guild", guildSchemas)


/**hints
 * mongoose.SchemaTypes.String {{{ => equal <=}} String
 *
 */