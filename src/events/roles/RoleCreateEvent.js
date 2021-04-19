// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class RoleCreateEvent extends BaseEvent {
  constructor() {
    super('roleCreate');
  }
  
  async run(client, role) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: role.guild.id}) || await GuildConf.create({guildId: role.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);


    client.channels.cache.get("805463360228294699").send("role created event")

    
  }
}