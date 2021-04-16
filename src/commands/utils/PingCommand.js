const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super(
      'ping', //command name
      'utils', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {

    const m = await message.channel.send("Pinging..");
    const pong = ` <a:battry:800454222319058944> ${lang.ping.ping1}: \`\`\`js\n ${m.createdTimestamp -
      message.createdTimestamp} ms\`\`\` \n <a:battry:800454222319058944>${lang.ping.ping2
      } \`\`\`js\n${Math.round(client.ws.ping)} ms\`\`\``;
    m.edit(pong);


  }
}