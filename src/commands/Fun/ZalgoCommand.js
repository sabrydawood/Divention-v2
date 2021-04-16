const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Zalgo = require('to-zalgo')


module.exports = class ZalgoCommand extends BaseCommand {
  constructor() {
    super(
      'zalgo', //command name
      'Fun', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

 async run(client, message, args) {
    const embed = new MessageEmbed()
    .setColor("blue")
    .setDescription(`${Zalgo(args.join(" "))}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL({dynamic : true}))
   message.channel.send(embed)
 }
}