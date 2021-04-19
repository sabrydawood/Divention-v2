// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require("discord.js")

let chID = "805463360228294699";


module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client, guild) {


    const nope = guild.members.cache.size
    /* if(nope < 50 ) {
       //guild.leave()
    let ch = client.channels.cache.get(chID);
     ch.send("fake guild i have left it " + guild.name)
     }else {*/



    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: guild.id }) || await GuildConf.create({ guildId: guild.id })
    let language = guildConf.language
    let prefix = guildConf.prefix

    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const joinembed = new Discord.MessageEmbed()
      .setAuthor(guild.name)
      .setTitle("<:1_:803644842684973137>New Guild i have Joined<:1_:803644842684973137>")
      .setDescription(`
    __** Now we have :**__ [${client.guilds.cache.size}] Guilds \n\n
    **__Guild Detail's__**\n
    **Guild Id :**[${guild.id}]\n
    **Guild Name :** [${guild.name}]\n
    **Guild Owner :** [${guild.owner}]\n
    **Guild MemberCount :** [${guild.members.cache.size}]
    `)
      .setColor("BLUE")
    try {
      let ch = client.channels.cache.get(chID);
      if (!ch) return;
      ch.send(joinembed)
    } catch (e) {
      ch.send("i have ann err to send details `" + e.message + "`")
      console.error(e.message)
    }
    let channelID;
    const channels = guild.channels.cache;
    channelLoop: for (let c of channels) {
      const channelType = c[1].type;
      if (channelType === "text") {
        channelID = c[0];
        break channelLoop;
      }
    }

    const channel = client.channels.cache.get(guild.systemChannelID || channelID);
    const welcomebed = new Discord.MessageEmbed()
      .setTitle(lang.guildcreate.embedtitle)
      .setColor("BLUE")
      .setDescription(lang.guildcreate.embeddesc)
      .addField(
        lang.guildcreate.embedfield, "https://discord.gg/wcM7ymtYTA", true
      )
      .addField(' use ', prefix + "\`help\` to get help commands ", true
      )
    if (!channel) return;
    channel.send(welcomebed);




  }
}