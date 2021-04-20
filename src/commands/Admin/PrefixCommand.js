const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require("../../database/schemas/Guild")
module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super(
      'prefix', //command name
      'Admin', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {
    const Guild = await GuildConfig.findOne({ guildId: message.guild.id })
    const prefix = Guild.prefix
    const new_prefix = args[0]
if(!new_prefix) return message.reply(lang.ADMIN.PROVIDE_VALID_PREFIX)
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply(lang.lang.permss)
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.lang.perms)
    if (prefix === new_prefix) return message.reply(lang.ADMIN.PROVIDE_SAME_PREFIX)
    await GuildConfig.findOneAndUpdate({ guildId: message.guild.id },
      { prefix: new_prefix },
      { new: true })
      message.channel.send(lang.prefix.done + " ` "+ new_prefix + "`")
  }
}