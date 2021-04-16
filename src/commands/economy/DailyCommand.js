const BaseCommand = require('../../utils/structures/BaseCommand');
const UserConf = require("../../database/schemas/user")
const prettyMS = require('pretty-ms');
const lastDate = [];


module.exports = class DailyCommand extends BaseCommand {
  constructor() {
    super(
      'daily', //command name
      'economy', // command category 
      ["d"], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {
    const ignoreCooldown = false;
    const now = Date.now();
    const cooldown = 0 * 60 * 1000;
    const user = await UserConf.findOne({ discordId: message.author.id })
    // const timeout = 86400000; /* 24h timeout */
    const amount = Math.floor(Math.random() * 4000) + 1;
    const currentMoney = user.coins;
    // const daily = user.daily;

    // if (daily !== null && timeout - (Date.now() - daily) > 0) {
    //   const time = moment(timeout - (Date.now() - daily)).format("h [hrs], m [mins], s [secs]");
    //   message.channel.send(`${lang.ECONOMY.DAILY_ERROR} ${time} remaining`);
    // } else {



    if (lastDate[message.guild.id] === undefined) {
      lastDate[message.guild.id] = 0;
    }
    if (now - lastDate[message.guild.id] > cooldown || ignoreCooldown) {
      await UserConf.findOneAndUpdate(
        { discordId: message.author.id, },
        { coins: currentMoney + amount, },
        { new: true });

      lastDate[message.guild.id] = now;
      message.channel.send(lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", amount));
    } else {
      const remaining = prettyMS(
        Math.round(cooldown - (now - lastDate[message.guild.id])),
        { verbose: true, unitCount: 3, secondsDecimalDigits: 0 }
      );
      message.channel.send(lang.send.wait1 + remaining + lang.send.wait2);
    }
  }
}

