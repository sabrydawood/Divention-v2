const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent');

module.exports = class HugCommand extends BaseCommand {
  constructor() {
    super(
      'hug', //command name
      'image', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    // const { body } = await superagent
    //   .get("https://newstepapi.neran590.repl.co/hug");
      const body = await fetch("https://newstepapi.neran590.repl.co/hug").then((res) =>
      res.json()
    );
      
          const embed = new MessageEmbed()
         .setColor("red")
          .setTitle(lang.hug.t)
      .setDescription(`${victim} ${lang.hug.c} ${message.author}`)
      .setImage(body.url)
       .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL({dynamic : true}))
  
    message.channel.send(embed);  }
}