// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildUpdateEvent extends BaseEvent {
  constructor() {
    super('guildUpdate');
  }
  
  async run(client, oldGuild, newGuild) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: oldGuild.id}) || await GuildConf.create({guildId: oldGuild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    // const fetchedLogs = await role.guild.fetchAuditLogs({
    //   limit: 1,
    //   type: 'GUILD_UPDATE',
    // });
    // const Log = fetchedLogs.entries.first();
    // if (!Log) return;
    // const { executor, target, reason } = Log;

    





  }
}