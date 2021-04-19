// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class RoleUpdateEvent extends BaseEvent {
  constructor() {
    super('roleUpdate');
  }

  async run(client, oldRole, newRole) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: newRole.guild.id }) || await GuildConf.create({ guildId: newRole.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);

    client.channels.cache.get("805463360228294699").send("role updated from " + oldRole.name + " to " + newRole.name)




  }
}