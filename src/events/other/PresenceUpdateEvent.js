// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-presenceUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class PresenceUpdateEvent extends BaseEvent {
  constructor() {
    super('presenceUpdate');
  }
  
  async run(client, oldPresence, newPresence) {
    
  }
}