const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super(
      'servers', //command name
      'botOwner', // command category 
      [], // aliases
      false , // nsfwOnly
      true , //owner only
      0 , // coolDown
      [] // options 
      );
  }

  run(client, message, args) {

    let servers = " ";
    let num = 0;
    client.guilds.cache.forEach(server => {
      num = num + 1;
      servers += `\`${num} - \`** ${server.name}** Id : ${server.id}\n`;
    })
    message.channel.send(servers);
  }
}