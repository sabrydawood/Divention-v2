// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardReconnecting
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ShardReconnectingEvent extends BaseEvent {
  constructor() {
    super('shardReconnecting');
  }
  
  async run(client, id) {
    
  }
}