const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require("../../database/schemas/Guild")
 const { MessageEmbed } = require('discord.js');

module.exports = class PreviewCommand extends BaseCommand {
  constructor() {
    super(
      'preview', //command name
      'bump', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      0, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {
    const currentGuild = await GuildConfig.findOne({ guildId: message.guild.id })
    const desc = currentGuild.bumpServerDescription ?? lang.pre.nodesc;
    const photo = currentGuild.bumpIconServers ?? "https://media.discordapp.net/attachments/799988437557313597/832524368914677790/250000.png?width=946&height=473";
    const channel = currentGuild.bumpChannelServers ?? lang.pre.noch;
    const link = currentGuild.bumpServerInviteurl ?? lang.pre.nolink;
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setURL("https://example.com")
      .setTitle(lang.pre.emtitle)
      .setDescription(`${lang.pre.emdesc}\n ${desc} \n ${lang.pre.emfild} \n <#${channel.id}> `)
      .setImage(photo);

    message.channel.send(link, embed);
  }
}