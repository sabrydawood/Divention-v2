const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const data = require("../../json/commands/kiss.json")

module.exports = class LoveCommand extends BaseCommand {
  constructor() {
    super(
      'love', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args , lang) {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
    const body = Math.floor(Math.random() * 100) + 1;
    const embed = new MessageEmbed()
      .setColor("red")
      .setTitle(lang.IMAGE.LOVE_C)
      .setDescription(`${victim} ${lang.IMAGE.LOVE_T} ${message.author}`)
      .setImage(body)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
      
    message.channel.send(embed);
  }
}