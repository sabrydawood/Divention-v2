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
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.EMOJI_DELETED)
      .setDescription(lang.EVENTS.EMOJI_DELETED_MSG.replace("{emoji}", emoji))
      .setColor("RED")
      .setTimestamp();

      Channel.send(embed)



  }
}