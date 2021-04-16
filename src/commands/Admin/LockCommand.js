const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super(
      'lock', //command name
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
  let lockReason = args.join(" ")
  let channel = message.mentions.channels.first();

  if (channel) {
    lockReason = args.join(" ").slice(22)
  } else {
    channel = message.channel;
  }

  if (!lockReason){const lockReason = lang.lock.nores;}
  

  if (!user.hasPermission(["MANAGE_CHANNELS"]))
    return message.channel.send(lang.lock.memprems);

  channel.updateOverwrite(message.guild.id, {
    SEND_MESSAGES: false,
  });
  message.channel.send(
    lang.lock.done + ` ${channel} \n${lockReason}`
  );

}
}