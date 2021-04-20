const BaseCommand = require('../../utils/structures/BaseCommand');
const data = require("../../json/commands/kiss.json")
const { MessageEmbed } = require('discord.js')
module.exports = class KissCommand extends BaseCommand {
  constructor() {
    super(
      'kiss', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args ,lang) {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
    const body = data[Math.floor(Math.random() * data.length)];

    const embed = new MessageEmbed()
      .setColor("red")
      .setTitle(lang.IMAGE.KISS_C)
      .setDescription(`${victim} ${lang.IMAGE.KISS_T} ${message.author}`)
      .setImage(body)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))

    message.channel.send(embed);


  }
}