const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

const fetch = require('node-fetch')

module.exports = class WikiCommand extends BaseCommand {
  constructor() {
    super(
      'wiki', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {

    const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
    ).then(res => res.json().catch(() => {}));
  
  if (!body) return message.channel.sendmessage.channel.send({embed: {
                color: "RED",
                title: lang.wiki.err1
            }})
    if (body.title && body.title === lang.wiki.notfound) return message.channel.send({embed: {
                color: "RED",
                title: lang.wiki.err1
            }});

  const embed = new Discord.MessageEmbed()
      .setTitle(`🌐 ${body.title} `)
  .addField(lang.wiki.f1,lang.wiki.click + `(${body.content_urls.desktop.page})**`, true)
      .setDescription(`** ${body.extract}**`)
      .setColor("red")
  .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL({dynamic : true}))
  
   if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
  message.channel.send(embed);
}
}