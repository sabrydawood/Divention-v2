const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ColorCommand extends BaseCommand {
  constructor() {
    super(
      'color', //command name
      'utils', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

 async run(client, message, args , lang) {

    const Discord = require("discord.js");

      const color = args[0]
      let role = message.guild.roles.cache.find(r => r.name === color);
      const embedd = new Discord.MessageEmbed()
        .setFooter(
          "Requested by " + message.author.username,
          message.author.avatarURL()
        )
        .setDescription(`**There's No Color With This Number ** :x: `)
        .setColor(`ff0000`);
      if (!role) return message.channel.send(embedd);
      if (isNaN(role))
        return message.channel.send(
          embedd.setDescription("Please select a number :x:")
        );
      if (!role)
        return message.channel.send(embedd);
      if (!role) return message.reply('sorry no color with this name')
      if (role.permissions.has("ADMINISTRATOR"))
        return message.channel.send(
          embedd.setDescription("This color has administrator!")
        );
      const embed = new Discord.MessageEmbed()
        .setFooter(
          "Requested by " + message.author.username,
          message.author.avatarURL()
        )
        .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

        .setColor(`${role.hexColor}`);
      try {
        const roles = message.member.roles.cache.filter((r) => !isNaN(r.name))
        /*
        let x;
            for (x = 1; x < roles.length; x++) {
              const re = message.guild.roles.cache.find(r => r.name === x)
              message.member.roles.remove(re);
            }*/
        roles.each((role) => {
          message.member.roles.remove(role);
        });
        await message.member.roles.add(role);
        message.channel.send(embed);

      } catch (e) {
        if (e) {
          throw e.message
        }
      }
    }
  }