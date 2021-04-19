// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildMemberUpdateEvent extends BaseEvent {
  constructor() {
    super('guildMemberUpdate');
  }
  
  async run(client, oldMember, newMember) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: newMember.guild.id}) || await GuildConf.create({guildId: newMember.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);


    




  }
}