const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super(
      'mute', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    const Discord = require('discord.js');
      if (!message.guild.me.hasPermission('MANAGE_ROLES'))
        return message.channel.send(lang.mute.meprems);
      const muteUser = message.guild.member(message.mentions.users.first());
      if (!muteUser) return message.channel.send(lang.ban.notfound);
      if (muteUser.roles.cache.find(r => r.name === 'muted')) {
        return message.channel.send(lang.mute.alred);
      }
      if (muteUser.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(lang.mute.cant);
      }
      if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(lang.ban.prems);
      }
      const reason = args.join(' ') || lang.ban.nospc;
      const embed = new Discord.MessageEmbed()
        .setAuthor(lang.mute.title, muteUser.user.displayAvatarURL())
        .setColor('RED')
        .setDescription(`${lang.mute.f1} \`\`${message.guild.name}\`\``)
        .addField(lang.mute.f3, message.author, true)
        .addField(lang.mute.f4, reason, true)
        .setTimestamp();
      const embed1 = new Discord.MessageEmbed()
        .setAuthor(lang.mute.title, muteUser.user.displayAvatarURL())
        .setColor('RED')
        .setDescription(`${muteUser.user.username} ${lang.mute.f2}`)
        .addField(lang.mute.f3, message.author, true)
        .addField(lang.mute.f4, reason, true)
        .setTimestamp();
    
      const muteRole =
        message.guild.roles.cache.find(r => r.name === 'muted') ||
        message.guild.roles.create({
          data: {
            name: 'muted',
            color: 'GRAY'
          },
          reason: 'Mute a user'
        });
    
    
      const roles =
        muteUser.roles.cache
          .filter((r) => r.id)
    
    
    
    
      message.guild.channels.cache.forEach(async channel => {
        await channel.updateOverwrite(muteRole, {
          SEND_MESSAGES: false
        });
      });
      //await muteUser.roles.get(roles)
      muteUser.roles.add(muteRole);
      //muteUser.user.send(embed);
      message.channel.send(embed1);
      }
}