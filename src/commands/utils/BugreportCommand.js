const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BugreportCommand extends BaseCommand {
  constructor() {
    super(
      'bugreport', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args , lang) {
    const { MessageEmbed } = require("discord.js");

      const bug = args.join(" ");
        if (!"800703669976301568") {
          return message.channel.send(lang.bug.nochannel);
        }
        if (!bug) return message.channel.send(lang.bug.nobug);
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .setTitle(`${message.author.username}` + lang.bug.arrived)
          .setDescription(bug)
          .setFooter(message.author.username)
          .setTimestamp();
        client.channels.cache.get("800703669976301568").send(embed);
        return message.channel.send(lang.bug.done);  }
}