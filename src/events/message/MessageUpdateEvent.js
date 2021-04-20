// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }

  async run(client, oldMessage, newMessage) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: oldMessage.guild.id })
      || await GuildConf.create({ guildId: oldMessage.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    const blacklistedWords = guildConf.blacklistedwords;
    if (!oldMessage.content || !newMessage.content) {
      return;
    }
    if (newMessage.author?.id === client.user.id) return;
    if (oldMessage.content === newMessage.content) return;
    if (blacklistedWords !== null && blacklistedWords[0]) {
      blacklistedWords.forEach((word) => {
        if (newMessage.content.toLowerCase().includes(word.toLowerCase())) {
          newMessage.delete();
          return newMessage
            .reply(
              "You used a bad word the admin has set, therefore your message was deleted!"
            )
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 5000);
            });
        }
      });
    }
    const poldMessage =
      oldMessage.content.length > 1024
        ? `${oldMessage.content.slice(0, 1010)}...`
        : oldMessage;
    const PnewMessage =
      newMessage.content.length > 1024
        ? `${newMessage.content.slice(0, 1010)}...`
        : newMessage;
    const messageLink = `https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`;
    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMessage.channel.name}**`)
      .setDescription(
        `Message send by **${newMessage.author.tag}** was edited [jump to message](${messageLink})`
      )
      .addField("**Old Message**", `${poldMessage}`)
      .addField("**New Message**", `${PnewMessage}`)
      .setColor("ORANGE")
      .setTimestamp();
    Channel.send(embed)
  }
}