// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDeleteBulk
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageDeleteBulkEvent extends BaseEvent {
  constructor() {
    super('messageDeleteBulk');
  }
  async run(client, messages) {
    const guild = messages.map(m => m.guild.id)
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: guild })
      || await GuildConf.create({ guildId: guild })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_BULK_DELETE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return ;
    const { executor, target ,reason } = Log;

    const length = messages.array().length;
    const channel = messages.first().channel.name;
    const msgs = messages.map(message => `Message:[${message.content}] \nBy: ${message.author}`)
    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_BLUKED )
      .setDescription(`${length} Messages purged in #${channel} \nBy : ${executor.tag}`)
      .setFooter(`${length} latest shown`)
      .setColor('#dd5f53')
      .setTimestamp();
    // messages.first().channel.send(embed);
    Channel.send(embed)


  }
}


