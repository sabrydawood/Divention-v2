// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class UserUpdateEvent extends BaseEvent {
  constructor() {
    super('userUpdate');
  }
  
  async run(client, oldUser, newUser) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: newUser.guild.id}) || await GuildConf.create({guildId: newUser.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);




  }
}