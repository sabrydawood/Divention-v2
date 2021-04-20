const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const data = require("../../json/commands/hug.json")
module.exports = class HugCommand extends BaseCommand {
  constructor() {
    super(
      'hug', //command name
      'image', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
    // const { body } = await superagent
    //   .get("https://newstepapi.neran590.repl.co/hug");
    const body = data[Math.floor(Math.random() * data.length)];
    const embed = new MessageEmbed()
    .setColor("red")
    .setTitle(lang.IMAGE.HUG_C)
    .setDescription(`${victim} ${lang.IMAGE.HUG_T} ${message.author}`)
    .setImage(body)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
    message.channel.send(embed);
  }
}