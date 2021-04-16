const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super(
      'ban', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(lang.ban.meprems);
    }

    const banUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let banReason = args[1];

    if (!banUser) return message.channel.send(lang.ban.notfound);
    if (!banReason) banReason = lang.ban.nospc;

    if (!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send(lang.ban.prems);

    if (!banUser.bannable || banUser.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(lang.member.no);
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) <
      0
    ) {
      return message.channel.send(
        lang.ban.cant + ` **${banUser.tag}** !`
      );
    }
try{
    banUser.ban({ days: 7, reason: banReason });
/*senda = client.users.cache.get(banUser.id)

   senda.send(
      `You've been **banned** from **${message.guild.name}**, Reason: **${banReason}**`
    );*/
    message.channel.send(
      `${banUser} ${lang.ban.done} **${banReason}**. `
    );
} catch (e) {
  message.channel.send(e.message)
}  }
}