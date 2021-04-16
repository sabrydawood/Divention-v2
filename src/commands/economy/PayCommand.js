const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const UserConf = require("../../database/schemas/user")
const { findMember } = require("../../utils/functions/dbFunctions")


module.exports = class PayCommand extends BaseCommand {
  constructor() {
    super(
      'pay', //command name
      'economy', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {
    const member = await findMember(message, args, true);
    const amount = Number(args[1]);
    if (!member) {
      return message.channel.send(lang.addcoin.nomention);
    }
    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }
    if (!amount || isNaN(amount)) {
      return message.channel.send(lang.addcoin.amount);
    }
    const receiver = await UserConf.findOne({ discordId: member.id })
    const sender = await UserConf.findOne({ discordId: message.author.id })
    console.log(sender.coins)
    console.log(receiver.coins)
    if (amount < 0) {
      return message.channel.send(lang.pay.not1);
    }
    if (amount > sender.coins) {
      return message.channel.send(lang.pay.noten + ` ${member.user.username}`);
    }
    if (message.author.id == member.id) {
      return message.channel.send(lang.pay.yourself);
    }
    if (amount)
      await message.channel.send(lang.pay.react);
    message.react("✅");
    message.react("❎");
    let filter = (reaction, user) => ["✅", "❎"].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
    let reactions = await message.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] });
    let choice = reactions.get("✅") || reactions.get("❎");
    if (choice.emoji.name === "❎") {
      message.delete({ timeout: 500 })
    }
    if (choice.emoji.name === "✅") {
      message.delete({ timeout: 500 })
      await UserConf.findOneAndUpdate(
        { discordId: member.id },
        { coins: receiver.coins + amount },
        { new: true });
      await UserConf.findOneAndUpdate(
        { discordId: message.author.id },
        { coins: sender.coins - amount },
        { new: true });

      member.send(
        new Discord.MessageEmbed()
          .setColor("#00BFFF")
          .addField(lang.pay.f1, `${message.author}`, true)
          .addField(lang.pay.f2, `\`${message.author.id}\``, true)
          .addField(lang.pay.f3, `${member.user.username}`)
          .addField(lang.pay.f4, `${amount}`, true)
          .addField(lang.pay.f5, `${message.guild.name}`, true)).catch((e) => { console.log(e) });
      message.channel.send(`${message.author.username} ${lang.pay.f6} [\`${amount}\`] ${lang.pay.f3} ${member.user} `);
      
    }
  }
}
