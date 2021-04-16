const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super(
      'clear', //command name
      'Admin', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(lang.prg.me);

    const user = message.member;
    const amount = args[0];
    if (!user.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(lang.ban.memprems);

    if (!amount) return message.channel.send(lang.prg.err1);
    await message.delete()
    message.channel.bulkDelete(Number(amount)).then(() => {
      message.channel
        .send(`\`\`\`js\n${lang.prg.f1} ${args[0]} ${lang.prg.f2}\`\`\``)
        .then((msg) => msg.delete({ timeout: 2000 }, true));
    }).catch(err => {
      if (err) return message.channel.send(lang.prg.err2)
    })
  }
}
