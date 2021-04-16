const BaseCommand = require('../../utils/structures/BaseCommand');
const UserConf = require("../../database/schemas/user")
const prettyMS = require('pretty-ms');
const lastDate = [];
const { findMember } = require("../../utils/functions/dbFunctions")



module.exports = class RepCommand extends BaseCommand {
  constructor() {
    super(
      'rep', //command name
      'economy', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {
    const ignoreCooldown = false;
    const now = Date.now();
    const cooldown = 0 * 60 * 1000;
    const member = await findMember(message, args, true);
    const UserConfig = await UserConf.findOne({ discordId: member.id })
    if (!member) return message.channel.send(lang.addcoin.nomention)
    if (member.id == message.author.id) return message.channel.send(lang.rep.realy)


    if (lastDate[message.guild.id] === undefined) {
      lastDate[message.guild.id] = 0;
    }
    if (now - lastDate[message.guild.id] > cooldown || ignoreCooldown) {
      await UserConf.findOneAndUpdate(
        { discordId: member.id },
        { rep : UserConfig.rep + 1 },
        { new: true })

      lastDate[message.guild.id] = now;
      message.channel.send(lang.rep.f1 + ` ${member.user.tag} ` + lang.rep.f2)
    } else {
      const remaining = prettyMS(
        Math.round(cooldown - (now - lastDate[message.guild.id])),
        { verbose: true, unitCount: 3, secondsDecimalDigits: 0 }
      );
      message.channel.send(lang.send.wait1 + remaining + lang.send.wait2);
    }
  }
}