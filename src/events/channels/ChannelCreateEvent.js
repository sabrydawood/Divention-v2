// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
const BaseEvent = require('../../utils/structures/BaseEvent');
    const { MessageEmbed } = require("discord.js");
module.exports = class ChannelCreateEvent extends BaseEvent {
  constructor() {
    super('channelCreate');
  }

  async run(client, channel) {
    console.log(channel.name + ' was created.');
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
      type: 'CHANNEL_CREATE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return;
    const { executor, target, reason } = Log;

    
    let msg = "";

    const type = channel.type === "category" ? "Category" : "Channel";
    msg = lang.EVENTS.CHANNEL_CREATED_MSG.replace("{channel_type}", type).replace(
      "{channel}",
      channel.name
    ).replace("{executor}" , executor.tag);;

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_CREATED)
      .setDescription(msg)
      .setColor("GREEN")
      .setTimestamp();

    const Channel = await client.channels.fetch(Dbchannel);
    Channel.send(embed);



  }
}