const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super(
      'invite', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {   
     message.channel.send(`<@${message.author.id}>  
  please read <#800358845141483521> Before use
\n
 > https://discord.com/api/oauth2/authorize?client_id=800008189679763466&permissions=8&scope=bot%20applications.commands`)
  }
}