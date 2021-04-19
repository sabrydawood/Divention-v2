// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require("discord.js");

module.exports = class ChannelUpdateEvent extends BaseEvent {
  constructor() {
    super('channelUpdate');
  }

  async run(client, oldChannel, newChannel) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: newChannel.guild.id }) || await GuildConf.create({ guildId: newChannel.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);

    if (!oldChannel.guild) return;
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;

    let msg = "";
    const type = newChannel.type === "category" ? "Category" : "Channel";
    if (oldChannel.name !== newChannel.name) {
      msg = lang.EVENTS.CHANNEL_RENAME_MSG.replace("{channel_type}", type)
        .replace("{channel}", oldChannel.name)
        .replace("{new_channel}", newChannel.name);
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_RENAME)
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();
    const Channel = await client.channels.fetch(Dbchannel);
    Channel.send(embed);







  }
}