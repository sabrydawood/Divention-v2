// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ChannelCreateEvent extends BaseEvent {
  constructor() {
    super('channelCreate');
  }
  
  async run(client, channel) {
    console.log(channel.name + ' was created.');
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({guildId: channel.guild.id}) || await GuildConf.create({guildId: channel.guild.id})
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);






  }
}