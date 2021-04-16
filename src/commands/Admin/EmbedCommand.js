const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class EmbedCommand extends BaseCommand {
  constructor() {
    super(
      'embed', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    const { MessageEmbed } = require('discord.js')

        const disc = args.join(" ");
       const { name } = message.guild;
        const embed = new MessageEmbed()
          .setTitle(name)
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
          .setDescription(`**Description**\n\n\`\`\` ${disc} \`\`\``)
          .setFooter(message.author.username)
          .setColor("BLUE")
          .setTimestamp();
    
          const sendMessage = await message.channel.send(embed)
              sendMessage.react("💠");
                }
}