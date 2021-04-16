const BaseCommand = require('../../utils/structures/BaseCommand');
const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');
const api = new osu.Api("85842912bd27a41e4474c36868bd9b92605c61b0" , {
    notFoundAsError: true,
    completeScores: false 
})
module.exports = class OsuCommand extends BaseCommand {
  constructor() {
    super(
      'osu', //command name
      'Fun', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }

  run(client, message, args , lang) {


    let username = args[0]
  
  
    if (!args[0]) return message.channel.send(lang.osu.err)
    
    api.getUser({u: username}).then(user => {
    const osu = new MessageEmbed()
    .setTitle(lang.osu.title)
    .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
    .setColor("red")
    .addField(lang.osu.f1, user.name)
    .addField(lang.osu.f2, Math.round(user.pp.raw))
    .addField(lang.osu.f3, user.pp.rank)
    .addField(lang.osu.f4, Math.round(user.level))
    .addField(lang.osu.f5, user.scores.ranked)
    .addField(lang.osu.f6, user.country)
    .addField(lang.osu.f7, user.pp.countryRank)
    .addField(lang.osu.f8, user.counts.plays)
    .addField(lang.osu.f9, `${user.accuracyFormatted}`)
    .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL({dynamic : true}))
    //console.log(user)
    message.channel.send(osu)
    })
    
      }
}