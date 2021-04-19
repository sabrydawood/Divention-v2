// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class EmojiDeleteEvent extends BaseEvent {
  constructor() {
    super('emojiDelete');
  }
  
  async run(client, emoji) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: emoji.guild.id}) || await GuildConf.create({guildId: emoji.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);




  }
}