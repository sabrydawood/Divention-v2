// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-presenceUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class PresenceUpdateEvent extends BaseEvent {
  constructor() {
    super('presenceUpdate');
  }
  
  async run(client, oldPresence, newPresence) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: newPresence.guild.id}) || await GuildConf.create({guildId: newPresence.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);


    
  }
}