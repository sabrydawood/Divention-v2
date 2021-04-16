// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardResume
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ShardResumeEvent extends BaseEvent {
  constructor() {
    super('shardResume');
  }
  
  async run(client, id, replayedEvents) {
    
  }
}