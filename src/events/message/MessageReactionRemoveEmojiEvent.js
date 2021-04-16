// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveEmoji
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageReactionRemoveEmojiEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemoveEmoji');
  }
  
  async run(client, reaction) {
    
  }
}