const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlapCommand extends BaseCommand {
  constructor() {
    super(
      'slap', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }


  run(client, message, args) {
    message.channel.send('slap command works');
  }
}