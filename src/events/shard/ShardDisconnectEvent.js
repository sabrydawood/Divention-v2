// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ShardDisconnectEvent extends BaseEvent {
  constructor() {
    super('shardDisconnect');
  }
  
  async run(client, message) {
    
  }
}