// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildKickAdd
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require("discord.js")
module.exports = class GuildBanAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  async run(client, member) {

    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: member.guild.id }) || await GuildConf.create({ guildId: member.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;

    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
    });

    const kickLog = fetchedLogs.entries.first();
    // Let's perform a sanity check here and make sure we got *something*
    if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
    // We now grab the user object of the person who kicked our member
    // Let us also grab the target of this action to double check things
    const { executor, target, reason } = kickLog;
    const Channel = await client.channels.fetch(Dbchannel);
    const Reason = reason ?? lang.lock.nores
    if (target.id === member.id) {
      const embed = new MessageEmbed()
        .setTitle(lang.EVENTS.KICK_ADD)
        .addField(lang.MEMBER.TAG, member.user.tag, true)
        .addField(lang.EVENTS.EXECUTED_BY, executor.tag, true)
        .addField(lang.EVENTS.REASON, Reason)
        .setColor("ORANGE");
      Channel.send(embed);


    } 
  }
}


// client.on('guildMemberRemove', async member => {


//   if (kickLog.createdAt < member.joinedAt) { 
//       return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
//   }

//   // And now we can update our output with a bit more information
//   // We will also run a check to make sure the log we got was for the same kicked member
//   if (target.id === member.id) {
//       console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
//   } else {
//       console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
//   }
// });