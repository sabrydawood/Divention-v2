const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KillCommand extends BaseCommand {
  constructor() {
    super(
      'kill', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  run(client, message, args) {
    message.channel.send('kill command works');
  }
}