const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConf = require("../../database/schemas/Guild")
const Discord = require('discord.js');
const { ownerID } = require("../../json/config.json");

// const setup = ["set-bio", "set-background", "set-invitelink", "set-channel", "set-desc", "set-photo","set-prefix","set-welcome-img", "set-welcome-msg","set-welcome","set-lang"].join(" | ")
const canvas = ["hearts", "gay", "hide-avatar", "choko", "glitch", "gun", "petpet", "police", "triggered", "wanted"].join(" | ")
const dump = ["send", "preview"].join(" | ")
const economy = ["credits", "pay", "daily", "rep", "rank", "profile", "addcoins", "moneyleaderboard"].join(" | ")
const fun = ["osu", "zalgo", "weather", "hug"].join(" | ")
const moderation = ["addemojie", "ban", "unban", "kick", "mute", "unmute", "lock", "unlock", "clear", "joinvouce", "leavevoice"].join(" | ")
// const ticket = ["set-ticket", "close"].join(" | ")
const utility = ["colors", "color", "vote", "help", "avatar", "avatarserver", "ping", "uptime", "wiki", "invite", "feedback", "bugreport", "serverinfo", "enlarge", "userinfo"].join(" | ")
const ownercmds = ["leaveguild", " shutdown", "guilds", "blacklistall", "unblacklistall", " docs", "dbv", "blacklisteconomy", "unblacklisteconomy", "addcoins"].join(" | ")



module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super(
      'help', //command name
      'utils', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {




    const guild = await GuildConf.findOne({
      guildId: message.guild.id
    }) || await GuildConf.create({
      guildId: message.guild.id
    })

    const prefix = guild.prefix;
    // const cmdArgs = args[0];

    // if (cmdArgs) {
    //   const cmd = client.commands.get(cmdArgs) 
    //   if (!cmd) return message.channel.send(lang.help.notfound);

    //   const aliases = cmd.aliases ? cmd.aliases.map(alias => alias) : lang.help.noalis;
    //   const options = cmd.options ? cmd.options.map(option => option) : lang.help.nooption;
    //   const cooldown = cmd.cooldown ? `${cmd.cooldown}s` : lang.help.nocool;

    //   const embed = new Discord.MessageEmbed()
    //     .setColor('BLUE')
    //     .setTitle(lang.help.cmd + ` ${cmd.name}`)
    //     .addField(lang.help.aliases, aliases, true)
    //     .addField(lang.help.cool, `${cooldown}`, true)
    //     .addField(lang.help.use, cmd.usage ? `${prefix}${cmd.usage}` : lang.help.notspic, true)
    //     .addField(lang.help.cat, cmd.category, true)
    //     .addField(lang.help.descriptio, cmd.help.description ? cmd.description : lang.help.notspic)
    //   //	.addField(lang.help.op, options);
    //   return message.channel.send(embed);
    // }



























    const embed = {
      color: 0x0099ff,
      title: lang.help.title,
      url: 'https://discord.gg/wcM7ymtYTA',
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL(),
        url: 'https://discord.gg/wcM7ymtYTA',
      },
      description: lang.help.description,
      thumbnail: {
        url: client.user.displayAvatarURL({ dynamic: true, size: 512 }),
      },
      fields: [
        {
          name: lang.help.filed1,
          value: `${prefix}`,
        },
        // {
        //   name: lang.help.f1,
        //   value: setup,
        //   inline: false,
        // },
        {
          name: lang.help.f2,
          value: canvas,
          inline: false,
        },
        {
          name: lang.help.f3,
          value: dump,
          inline: false,
        },
        {
          name: lang.help.f4,
          value: economy,
          inline: false,
        },
        {
          name: lang.help.f5,
          value: fun,
          inline: false,
        },
        {
          name: lang.help.f6,
          value: moderation,
          inline: false,
        },
        /*		{
              name: lang.help.f7,
              value: ticket,
              inline: false,
        },*/
        {
          name: lang.help.f8,
          value: utility,
          inline: false,
        },
        {
          name: lang.help.f9,
          value: '||' + ownercmds + '||',
          inline: false,
        },
      ],
      image: {
        url: message.guild.bannerURL({
          size: 2048,
          dynamic: false,
        })
      },
      timestamp: new Date(),
      footer: {
        text: client.user.username,
        icon_url: client.user.displayAvatarURL()
      },
    };
    message.channel.send({ embed: embed });

  }
}