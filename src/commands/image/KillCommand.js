const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')

const data = require("../../json/commands/kill.json")
module.exports = class KillCommand extends BaseCommand {
  constructor() {
    super(
      'kill', //command name
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
    const body = data[Math.floor(Math.random() * data.length)];

    const embed = new MessageEmbed()
      .setColor("red")
      .setTitle(lang.IMAGE.KILL_C)
      .setDescription(`${victim} ${lang.IMAGE.KILL_T} ${message.author}`)
      .setImage(body)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))

    message.channel.send(embed);


  }
}