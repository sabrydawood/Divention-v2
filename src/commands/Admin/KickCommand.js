const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super(
      'kick', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send(lang.ban.kickprems);

  const kickUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  let kickReason = args[1];

  if (!kickUser) {
    return message.channel.send(lang.ban.notfound);
  }

  if (!kickReason) kickReason = lang.ban.nospc;

  if (!message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
    return message.channel.send(lang.ban.prems);

  if (!kickUser.kickable || kickUser.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(lang.ban.kick);
  }

  if (message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) < 0) {
    return message.channel.send(lang.ban.cant + ` **${kickUser.tag}** `);
  }


  kickUser.kick(kickReason);
/*
  kickUser.user.send(
    `You've been **kicked** from **${message.guild.name}**, Reason: **${kickReason}**`
  );*/
  message.channel.send(
    `${kickUser} ${lang.ban.kickd}**${kickReason}**.`
  );
}
}