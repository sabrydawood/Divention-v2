// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require("discord.js");

module.exports = class ChannelDeleteEvent extends BaseEvent {
  constructor() {
    super('channelDelete');
  }

  async run(client, channel) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: channel.guild.id }) || await GuildConf.create({ guildId: channel.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);

    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: 'CHANNEL_DELETE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return;
    const { executor, target, reason } = Log;

    const type = channel.type === "category" ? "Category" : "Channel";
    const msg = lang.EVENTS.CHANNEL_DELETED_MSG.replace("{channel_type}", type).replace(
      "{channel}",
      channel.name
    ).replace("{executor}" , executor.tag);

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_DELETED)
      .setDescription(msg)
      .setColor("RED")
      .setTimestamp();

    const Channel = await client.channels.fetch(Dbchannel);
    Channel.send(embed);

    }
}
