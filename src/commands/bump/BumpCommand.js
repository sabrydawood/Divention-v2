const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const prettyMS = require('pretty-ms');
const lastDate = [];
const GuildConfig = require("../../database/schemas/Guild")
module.exports = class BumpCommand extends BaseCommand {
  constructor() {
    super(
      'bump', //command name
      'bump', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      0, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {


    if (
      !message.member.hasPermission('ADMINISTRATOR') &&
      !message.member.hasPermission('MANAGE_GUILD')
    )
      return message.reply(lang.send.prems);
    const ignoreCooldown = false;
    const now = Date.now();
    const cooldown = 720 * 60 * 1000;

    const currentGuild = await GuildConfig.findOne({ guildId: message.guild.id })
    const curnt = currentGuild.bumpChannelServers


    if (!curnt) {
      return message.reply('❎❎❎');
    }
    if (lastDate[message.guild.id] === undefined) {
      lastDate[message.guild.id] = 0;
    }
    if (now - lastDate[message.guild.id] > cooldown || ignoreCooldown) {
      var gB = client.guilds.cache;
      var gS = client.guilds.cache.size;
      var gA = Array.from(gB);
      async function dumping() {
        for (let i = 0; i < gS; i++) {
          var g = gA[i][1];
          var gId = g.id;
          await client.guilds.fetch(gId).then(async guild => {
            const guildChannel = await GuildConfig.findOne({ guildId: guild.id })

            const ch = guildChannel.bumpChannelServers

            const pic = guildChannel.bumpIconServers ||
              message.guild.iconURL({ dynamic: true, size: 2048 });

            const desc = guildChannel.bumpServerDescription || lang.send.nodesc;

            const random = 'https://discord.gg/wcM7ymtYTA';

            const url = guildChannel.bumpServerInviteurl || random;

            const channels = message.guild.channels.cache.size;
            const users = message.guild.members.cache.size;
            const imoje = message.guild.emojis.cache.size || 0;
            const bots =
              message.guild.members.cache.filter(m => m.user.bot).size || 0;
            const nonAnimated = [];
            const animated = [];

            message.guild.emojis.cache.forEach(e => {
              if (e.animated) animated.push(e.toString());
              else nonAnimated.push(e.toString());
            });
            const animatedV =
              animated.join(' ').length > 1024
                ? `${animated.join(' ').slice(1010)}...`
                : animated.join(' ') || 'No emojies';
            const nonAnimatedV =
              nonAnimated.join(' ').length > 1024
                ? `${nonAnimated.join(' ').slice(1010)}...`
                : nonAnimated.join(' ') || 'No emojies';
            const online = message.guild.members.cache.filter(
              member => member.presence.status !== 'offline'
            ).size;
            const ofline =
              message.guild.members.cache.filter(
                member => member.presence.status == 'offline'
              ).size || 0;
            const dnd =
              message.guild.members.cache.filter(
                member => member.presence.status == 'dnd'
              ).size || 0;
            const idle =
              message.guild.members.cache.filter(
                member => member.presence.status == 'idle'
              ).size || 0;
            const embed = new MessageEmbed()
              .setAuthor(
                message.guild.name,
                message.guild.iconURL({ dynamic: true })
              )
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setColor('RANDOM')
              .setURL('https://discord.gg/wcM7ymtYTA')
              .setTitle(
                '<a:shop:800439891439124510> ' +
                lang.send.title +
                '<a:shop:800439891439124510>'
              )
              .setDescription(`${lang.send.sdesc}\n${desc}`)
              .setImage(`${pic}`)
              .addFields(
                {
                  name: lang.send.val1,
                  value: 'https://discord.gg/wcM7ymtYTA',
                  inline: true
                },
                { name: '\u200B', value: '\u200B' },
                { name: lang.send.val2, value: `${url}` },
                { name: lang.send.val3, value: channels, inline: true },
                { name: lang.send.val4, value: users },
                { name: lang.send.val5, value: bots, inline: true },
                { name: lang.send.val6, value: animatedV, inline: true },
                { name: lang.send.val7, value: nonAnimatedV, inline: true },
                {
                  name: lang.send.val8,
                  value: `<a:green:803654925980532816>Online : ${online} | <a:plexiOffline:803656518628409385>Offline : ${ofline} | <a:red:803654894031863858>Dnd : ${dnd} | <a:yal:803654878059954176>Idle : ${idle}`
                }
              )

              .setTimestamp()
              .setFooter('Made By: Virgel');
            if (!ch || undefined) return;
            try {
              const c = await client.channels.fetch(ch.id);
              c.send(url, embed);
            } catch (error) {
              console.error(error.message);
            }
          });
        }
      }
      message.channel.send(lang.send.success1);

      await dumping();
      message.channel.send(lang.send.success2 + `<@${message.author.id}>`);
      lastDate[message.guild.id] = now;
    } else {
      // It's been less than the set cooldown.
      const remaining = prettyMS(
        Math.round(cooldown - (now - lastDate[message.guild.id])),
        { verbose: true, unitCount: 3, secondsDecimalDigits: 0 }
      );
      client.embed.send(message, {
        desc: lang.send.wait1 + remaining + lang.send.wait2
      });
    }
    //reminder qhen cooldown is finished
    setTimeout(() => {
      message.channel.send(lang.send.finish + `<@${message.author.id}>`);
    }, cooldown);


  }
}