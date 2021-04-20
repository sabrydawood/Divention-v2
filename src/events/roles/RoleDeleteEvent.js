// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class RoleDeleteEvent extends BaseEvent {
  constructor() {
    super('roleDelete');
  }

  async run(client, role) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: role.guild.id }) || await GuildConf.create({ guildId: role.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 'ROLE_DELETE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return;
    const { executor, target, reason } = Log;

    const embed = new MessageEmbed()
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** deleted  \n By : ${executor.tag}`)
      .setColor("RED")
      .setTimestamp();

    Channel.send(embed)

  }
}