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
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = lang.EVENTS.EMOJI_RENAMED_MSG
        .replace("{emoji_name}", oldEm.name)
        .replace("{new_name}", newEm.name)
        .replace("{emoji}", newEm);
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    Channel.send(embed)

  }
}