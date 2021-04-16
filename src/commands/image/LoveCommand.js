const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LoveCommand extends BaseCommand {
  constructor() {
    super(
      'love', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args) {
    message.channel.send('love command works');
  }
}