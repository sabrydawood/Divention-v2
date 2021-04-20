// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class UserUpdateEvent extends BaseEvent {
  constructor() {
    super('userUpdate');
  }

  async run(client, oldUser, newUser) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: oldUser.guild }) || await GuildConf.create({ guildId: oldUser.guild })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);

    let embed;
    if (oldUser.username !== newUser.neckname) {
      embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${oldUser.tag}'s **nickname** was changed.`)
        .addField("Nickname", `${oldUser.username} ➔ ${newUser.neckname}`);
    } else if (oldUser.avatar !== newUser.avatar) {
      embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${oldUser.tag}'s **avatar** was changed.`)
        .addField("Nickname", `${oldUser.avatar} ➔ ${newUser.avatar}`);
    } else return;
    Channel.send(embed)

  }
}