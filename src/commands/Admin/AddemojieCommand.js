const BaseCommand = require('../../utils/structures/BaseCommand');
const { Util , MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
module.exports = class AddemojieCommand extends BaseCommand {
  constructor() {
    super(
      'addemojie', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

 async run(client, message, args , lang) {
    const emoji = args[0];
    const name = args.slice(1).join(" ");

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || lang.ADMIN.GIVE_NAME);

        const embed = MessageEmbed()
          .setTitle(lang.ADMIN.EMOJI_ADDED)
          .setDescription(`${lang.ADMIN.EMOJI_ADDED_NAME} ${name || lang.ADMIN.GIVE_NAME}`);
        return message.channel.send(embed);
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }`;

        await message.guild.emojis.create(`${link}`, `${name || `${customEmoji.name}`}`);
        const embed = MessageEmbed()
          .setTitle(lang.ADMIN.EMOJI_ADDED)
          .setDescription(
            `${lang.ADMIN.EMOJI_ADDED_NAME} ${name || customEmoji.name} | ${lang.ADMIN.PREVIEW} [${lang.HELP.CLICK_ME}](${link})`
          );
        return message.channel.send(embed);
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
          return message.channel.send(lang.ADMIN.PROVIDE_VALID_EMOJI);
        }

        message.channel.send(lang.ADMIN.USE_NORMAL_EMOJI);
      }
    } catch (e) {
      if (String(e).includes("DiscordAPIError: Maximum number of emojis reached")) {
        return message.channel.send(lang.ADMIN.MAX_EMOJI);
      } else {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
    }  }
}