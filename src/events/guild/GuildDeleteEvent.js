// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require("discord.js")
let chID = "805463360228294699";

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }

  async run(client, guild) {
    try {
      const GuildConf = require("../../database/schemas/Guild")
      await GuildConf.findOneAndDelete({ guildId: guild.id })
      const joinembed = new Discord.MessageEmbed()
        .setAuthor(guild.name)
        .setTitle("<a:shrek_scream:803654361087475782>I Left Guild<a:shrek_scream:803654361087475782>")
        .setDescription(`
    __** Now we Back To :**__ [${client.guilds.cache.size}] Guilds \n\n
    **__Guild Detail's__**\n
    **Guild Id :**[${guild.id}]\n
    **Guild Name :** [${guild.name}]\n`)
        .setColor("RED")
      let ch = client.channels.cache.get(chID);
      if (!ch) return;
      ch.send(joinembed)
    } catch (error) {
      console.log(error.message)
    }
  }
}



