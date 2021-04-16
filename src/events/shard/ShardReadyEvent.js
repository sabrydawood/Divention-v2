// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class EmojiDeleteEvent extends BaseEvent {
  constructor() {
    super('shardReady');
  }
  
  async run(client, id, unavailableGuilds) {
    
  }
}