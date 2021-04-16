const BaseCommand = require('../../utils/structures/BaseCommand');
const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = class EnlargeCommand extends BaseCommand {
  constructor() {
    super(
      'enlarge', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    
    const emoji = args[0];
    if (!emoji) return message.channel.send("No emoji provided!");

    const custom = Util.parseEmoji(emoji);
    const embed = new MessageEmbed()
      .setTitle(`Enlarged of ${emoji}`)
      .setColor("BLUE");

    if (custom.id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${custom.id}.${
          custom.animated ? "gif" : "png"
        }`
      );
      return message.channel.send(embed);
    } else {
      let parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) return message.channel.send("Invalid emoji!");

      embed.setImage(parsed[0].url);
      return message.channel.send(embed);
    }

  }
}