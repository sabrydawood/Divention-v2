// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildIntegrationsUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildIntegrationsUpdateEvent extends BaseEvent {
  constructor() {
    super('guildIntegrationsUpdate');
  }
  
  async run(client, guild) {
    
  }
}