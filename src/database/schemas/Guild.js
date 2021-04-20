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
    blacklistedwords: {
        type: Array,
        default: []
    },
    disabled_commands: {
        type: Array,
        default: []
    },
    disabled_categories: {
        type: Array,
        default: []
    },
    announcement_channel: {
        type: String
    },
    suggest_channel: {
        type: String
    },
    defaultRole: {
        type: String,
    },
    memberLogChannel: {
        type: String,
    },
    logChannel: {
        type: String,
    },
    welcomeMessage: {
        type: String,
        default: "-member- 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 𝚂𝙴𝚁𝚅𝙴𝚁 -guild- \n𝚆𝙴 𝚆𝙸𝚂𝙷 𝚈𝙾𝚄 𝚃𝙷𝙴 𝙱𝙴𝚂𝚃 𝚃𝙸𝙼𝙴𝚂"
    },
    goodByeMessage: {
        type: String,
        default: "-member- Leaved from -guild-"
    },
    welcomeBg: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/778133840408346665/799272610142748723/unknown.jpeg"
    },
    language: {
        type: String,
        default: "en"
    },
    bumpChannelServers: {
        type: String,
    },
    bumpIconServers: {
        type: String,
        default: "https://media.discordapp.net/attachments/799988437557313597/832524368914677790/250000.png?width=946&height=473"
    },
    bumpChannelBots: {
        type: String,
    },
    bumpServerDescription: {
        type: String,
        default: "amazing server just join to have fun with us ❤️",
    },
    bumpServerInviteurl: {
        type: String,
    },
})
module.exports = mongoose.model("guild", guildSchemas)
