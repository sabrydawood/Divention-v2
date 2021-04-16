// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveAll
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageReactionRemoveAllEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
  async run(client, message) {
    
  }
}