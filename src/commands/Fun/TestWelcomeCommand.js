const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestWelcomeCommand extends BaseCommand {
  constructor() {
    super('testwlc', 'Fun', []);
  }

  run(client, message, args) {
    client.emit('guildMemberAdd', message.member);
  }
}