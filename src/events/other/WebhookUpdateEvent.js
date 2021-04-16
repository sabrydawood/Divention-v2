// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-webhookUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class WebhookUpdateEvent extends BaseEvent {
  constructor() {
    super('webhookUpdate');
  }
  
  async run(client, channel) {
    
  }
}