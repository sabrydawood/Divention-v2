const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestByeCommand extends BaseCommand {
  constructor() {
    super('testBye', 'Fun', []);
    
  }

  run(client, message, args) {
    client.emit('guildMemberRemove', message.member);
  }
}