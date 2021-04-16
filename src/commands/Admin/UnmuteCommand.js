const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super(
      'unmute', //command name
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
    
    if (!muteUser.roles.cache.find(r => r.name === 'muted')) {
      return message.channel.send(lang.unmute.alred);
    }
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(lang.lock.memprems);
    }
    const embed = new Discord.MessageEmbed()
      .setTitle(lang.unmute.f1)
      .setColor('GREEN')
      .setDescription(lang.unmute.f2)
      .addField(lang.unmute.f4, message.author);
    muteUser.send(embed).catch(function(err) {
      console.log('DM closed');
    });
    const embed2 = new Discord.MessageEmbed()
      .setTitle(lang.unmute.f1)
      .setColor('GREEN')
      .setDescription(`${muteUser.user.username} ` + lang.unmute.f3)
      .addField(lang.unmute.f4, message.author);
    const muteRole =
      message.guild.roles.cache.find(r => r.name === 'muted')
    
    message.guild.channels.cache.forEach(async channel => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: true
      });
    });
    muteUser.roles.remove(muteRole);
    //muteUser.user.send(embed);
    message.channel.send(embed2);
      }
}