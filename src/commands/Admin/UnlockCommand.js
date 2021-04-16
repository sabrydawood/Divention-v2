const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super(
      'unlock', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }
  async run(client, message, args , lang) {



    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(lang.lock.meprems);

  const user = message.member;
  const channel = message.mentions.channels.first() || message.channel;

  if (!user.hasPermission(["MANAGE_CHANNELS"]))
    return message.channel.send(lang.lock.memprems);

  channel.updateOverwrite(message.guild.id, {
    SEND_MESSAGES: true,
  });
  message.channel.send(`${channel} ` + lang.lock.done2);
}
}