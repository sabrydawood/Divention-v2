const BaseCommand = require('../../utils/structures/BaseCommand');
const UserConf = require("../../database/schemas/user")
const { findMember } = require("../../utils/functions/dbFunctions")
const { MessageEmbed } = require("discord.js")

module.exports = class CreditsCommand extends BaseCommand {
  constructor() {
    super(
      'credits', //command name
      'economy', // command category 
      ["c"], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

 async run(client, message, args, lang) {
    const member = await findMember(message, args, true);

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }
    const  user  = await UserConf.findOne({ discordId : member.id })

  const credits = user.coins


    console.log(credits)
    const embed = new MessageEmbed()
      .setTitle(`<a:rolling:800440004878139472>${member.user.username} <a:coins:800443399434010654>`)
      .addField(lang.coins.s1 + " " +lang.coins.s2, 
        credits, true    
        )
    // .addField(lang.ECONOMY.BANK, user.bank, true)
    // .addField(lang.COVID.TOTAL, user.bank + user.money, true);

    message.channel.send(embed);
  }
}