const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super(
      'unban', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    const userId = args[0];

    if (!userId) {
      return message.channel.send(lang.unban.noid);
    }

    const bannedUser = await message.guild.members.unban(userId);

    message.channel.send(
      `**${bannedUser.username}** ` + lang.unban.done
    );

  }
}