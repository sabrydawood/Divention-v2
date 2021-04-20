// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class RoleUpdateEvent extends BaseEvent {
  constructor() {
    super('roleUpdate');
  }

  async run(client, oldRole, newRole) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: newRole.guild.id }) || await GuildConf.create({ guildId: newRole.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    const fetchedLogs = await newRole.guild.fetchAuditLogs({
      limit: 1,
      type: 'ROLE_UPDATE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return;
      const { executor, target, reason } = Log;

    let msg = "";
    if (oldRole.name !== newRole.name) {
      msg = `Role: **${oldRole.name}** was renamed to **${newRole.name}** (${newRole}) \n By : ${executor.tag}`;
    } else if (oldRole.color !== newRole.color) {
      msg = `Role: **${newRole.name}**,\n 
       color: **${oldRole.color}** was recolored to **${newRole.color}** (${newRole}) \n By : ${executor.tag}`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Role Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    Channel.send(embed)

  }
}