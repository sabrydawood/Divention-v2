// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }

  async run(client, message) {

    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: message.guild.id })
      || await GuildConf.create({ guildId: message.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const { MessageEmbed } = require("discord.js");
    const Dbchannel = guildConf.logChannel
    if (!Dbchannel) return;
    const Channel = await client.channels.fetch(Dbchannel);
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });
    const Log = fetchedLogs.entries.first();
    if (!Log) return;
    const { executor, target, reason } = Log;

    const content = message.content ?? "Null"

    if (message.author?.id === client.user.id) return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(`\bMessage: \`${content}\` \n\b was deleted in ${message.channel} \n\b By ${executor.tag}`)
      .setColor("RED")
      .setTimestamp();

    if (message.attachments.size > 0) {
      embed.setDescription(
        `Message: \`an image attachment was deleted ${message.content ? `+ ${message.content}\`` : "`"
        } was deleted in ${message.channel}`
      );
    }
    Channel.send(embed)



  }
}