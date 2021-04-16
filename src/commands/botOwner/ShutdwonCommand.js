const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShutdwonCommand extends BaseCommand {
  constructor() {
    super(
      'shutdwon', //command name
      'botOwner', // command category 
      [], // aliases
      false , // nsfwOnly
      true , //owner only
      0 , // coolDown
      [] // options 
      );
  }

  run(client, message, args) {
    message.channel.send("Bot is shutting down...");
    process.kill(1); 
   }
}