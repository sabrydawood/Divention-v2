// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanRemove
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildBanRemoveEvent extends BaseEvent {
  constructor() {
    super('guildBanRemove');
  }
  
  async run(client, guild, user) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: guild.id}) || await GuildConf.create({guildId: guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    if (!guild.me.hasPermission(["MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"])) return;
    const audit = await (await guild.fetchAuditLogs()).entries.first();
      const unBannedMember = user.id === audit.target.id ? audit.target.tag : lang.EVENTS.NOT_FOUND;

      const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.BAN_REMOVE)
      .addField(lang.EVENTS.UNBANNED_MEMBER, unBannedMember ,true)
      .addField(lang.EVENTS.EXECUTED_BY, audit.executor.tag, true)
      .setColor("RED");

Channel.send(embed)




  }
}