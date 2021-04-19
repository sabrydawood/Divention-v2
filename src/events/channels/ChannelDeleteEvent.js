// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ChannelDeleteEvent extends BaseEvent {
  constructor() {
    super('channelDelete');
  }
  
  async run(client, channel) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: channel.guild.id}) || await GuildConf.create({guildId: channel.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);






  }
}
