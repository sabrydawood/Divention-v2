const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KissCommand extends BaseCommand {
  constructor() {
    super(
      'kiss', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args) {
    message.channel.send('kiss command works');
  }
}