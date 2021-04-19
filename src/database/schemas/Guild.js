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
        default : "-member- 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 𝚂𝙴𝚁𝚅𝙴𝚁 -guild- \n𝚆𝙴 𝚆𝙸𝚂𝙷 𝚈𝙾𝚄 𝚃𝙷𝙴 𝙱𝙴𝚂𝚃 𝚃𝙸𝙼𝙴𝚂"
    },
    goodByeMessage : {
        type : String,
        required: false , 
        default : "-member- Leaved from -guild-"
    },
    welcomeBg : {
        type : String,
        required: false , 
        default : "https://cdn.discordapp.com/attachments/778133840408346665/799272610142748723/unknown.jpeg"
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
        default : "https://media.discordapp.net/attachments/799988437557313597/832524368914677790/250000.png?width=946&height=473"
    },
    bumpChannelBots: {
        type: String,
        required: false,

    },
    // guild Bump Channels server settings
    bumpServerDescription: {
        type: String,
        required: false,
        default :"amazing server just join to have fun with us ❤️",
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