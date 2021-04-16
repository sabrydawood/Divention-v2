const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FeedbackCommand extends BaseCommand {
  constructor() {
    super(
      'feedback', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }
  async run(client, message, args , lang) {   
    const { MessageEmbed } = require("discord.js");

   const feedback = args.join(" ");
    if (!"800389311366430721")
      return message.channel.send(lang.feedback.notext);
    if (!"800389311366430721" || "800389311366430721" === "") return;
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${message.author.username} ` + lang.feedback.embedtitle)
      .setDescription(feedback)
      .setFooter(message.author.username)
      .setTimestamp();
 client.channels.cache.get("800389311366430721").send(embed);
message.channel.send(lang.feedback.succes);
  }
}