// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildBanAddEvent extends BaseEvent {
  constructor() {
    super('guildBanAdd');
  }
  
  async run(client, guild, user) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: guild.id}) || await GuildConf.create({guildId: guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);



  }
}