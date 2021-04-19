// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class EmojiUpdateEvent extends BaseEvent {
  constructor() {
    super('emojiUpdate');
  }
  
  async run(client, oldEmoji, newEmoji) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: newEmoji.guild.id}) || await GuildConf.create({guildId: newEmoji.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);




  }
}