const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super(
      'prefix', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    message.channel.send('prefix command works');
  }
}