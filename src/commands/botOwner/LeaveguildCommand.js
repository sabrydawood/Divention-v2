const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveguildCommand extends BaseCommand {
  constructor() {
    super(
      'leaveguild', //command name
      'botOwner', // command category 
      [], // aliases
      false , // nsfwOnly
      true , //owner only
      0 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args) {


    const guildId = args[0];

    if (!guildId) {
      return message.channel.send(lang.guildleave.noid);
    }

    const guild = client.guilds.cache.find((g) => g.id === guildId);

    if (!guild) {
      return message.channel.send(lang.guildleave.notfound);
    }

    try {
      await guild.leave();
      message.channel.send(`${lang.guildleave.succes}: **\`${guild.name}\`**`);
    } catch (e) {
      console.error(e);
      return message.channel.send(lang.guildleave.err);
    }

  }
}