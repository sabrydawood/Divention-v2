// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ChannelUpdateEvent extends BaseEvent {
  constructor() {
    super('channelUpdate');
  }
  
  async run(client, oldChannel, newChannel) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: newChannel.guild.id}) || await GuildConf.create({guildId: newChannel.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);








  }
}