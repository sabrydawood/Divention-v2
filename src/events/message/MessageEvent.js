const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildConf = require("../../database/schemas/Guild")
const UserConf = require("../../database/schemas/user")
const config = require("../../json/config.json")
const { version, MessageEmbed, Collection } = require("discord.js");
const cooldown = new Collection()
const ms = require("ms")
const moment = require("moment")
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {
    if (message.author.bot) return;
    const user = message.author
    // const blacklistedWords = guild?.blacklistedwords;
    // const blacklistedUsers = await Blacklist.find();
    const mentions = message.mentions.members;
    // const disabledCommands = guild?.disabled_commands;
    // const disabledCategories = guild?.disabled_categories;
    // const ignoredChannels = guild?.ignored_channels;
    // if (ignoredChannels?.includes(message.channel.id)) return;

    //get Guild from database
    const guildConf = await GuildConf.findOne({
      guildId: message.guild.id
    }) || await GuildConf.create({
      guildId: message.guild.id
    })
    const userConfig = await UserConf.findOne({
      discordId: message.author.id
    }) || await UserConf.create({
      discordId: message.author.id
    })


    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    //det values from guild database
    const prefix = guildConf.prefix;
    const credits = userConfig.coins
    let userxp = userConfig.globalXp || 1;
    // xp system 

    const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));
    if (!message.author.bot) {
      const xp = Math.ceil(Math.random() * (5 * 10));
      const level = calculateUserXp(userxp);
      const newLevel = calculateUserXp(userxp + xp);
      if (newLevel > level) {

        await UserConf.findOneAndUpdate({
          discordId: user.id,
        }, { coins: credits + 200 }, { new: true })
        const embed = new MessageEmbed()
          .setTitle(lang.messageEvent.levltitle)
          .addField(lang.messageEvent.f1, level)
          .addField(lang.messageEvent.f2, userxp)
          .setDescription(lang.messageEvent.levldesc + credits)
          .setFooter(user.username)

        const msg = await message.channel.send(embed);
        setTimeout(() => {
          msg?.delete();
        }, 10000);




      }
      await UserConf.findOneAndUpdate({
        discordId: user.id,
      }, { globalXp: userxp + xp }, { new: true })
    }










    // check if message has a badword in it
    // if (!message.content.includes(`${guild.prefix}blacklistedwords`) && !message.author.bot) {
    //   blacklistedWords !== null &&
    //     blacklistedWords.forEach((word) => {
    //       if (message.content.toLowerCase().includes(word.toLowerCase())) {
    //         message.delete();
    //         return message
    //           .reply("You used a bad word the admin has set, therefore your message was deleted!")
    //           .then((msg) => {
    //             setTimeout(() => {
    //               msg.delete();
    //             }, 5000);
    //           });
    //       }
    //     });
    // }

    // afk
    // if (mentions && !prefix.test(message.content)) {
    //   mentions.forEach(async (member) => {
    //     const { user } = await getUserById(member.user.id, guildId);

    //     if (user.afk.is_afk === true) {
    //       const embed = BaseEmbed(message)
    //         .setTitle("AFK!")
    //         .setDescription(`${member.user.tag} is AFK!\n **Reason:** ${user.afk.reason}`);
    //       message.channel.send(embed);
    //     }
    //   });
    // }

    // remove AFK from user if they send a message
    // const user = await UserModel.findOne({ user_id: userId, guild_id: guildId });
    // if (
    //   !message.author.bot &&
    //   user &&
    //   user?.afk.is_afk === true &&
    //   !message.content.includes(`${guild.prefix}afk`)
    // ) {
    //   await updateUserById(userId, guildId, {
    //     afk: {
    //       is_afk: false,
    //       reason: null,
    //     },
    //   });

    //   const msg = await message.channel.send(
    //     BaseEmbed(message).setDescription(`**${message.author.tag}** is not afk anymore`)
    //   );

    //   setTimeout(() => {
    //     msg.delete();
    //   }, 5000);
    // }


    const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
    const cmd = client.commands.get(cmdName);
    if (message.mentions.has(client.user.id) && !cmd) {
      const uptime = ms(client.uptime);
      const nodev = process.version;
      const createdAt = moment(client.user.createdAt).format("MM/DD/YYYY");
      const serverCount = client.guilds.cache.size;
      const embed = new MessageEmbed()
        .setTitle("<:BOT:803656383839862834>" + lang.messageEvent.quicktitle)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        .addField(lang.messageEvent.quicksprefix, prefix)
        .addField(lang.messageEvent.quickbotid, client.user.id)
        .addField(lang.messageEvent.quickbotusername, client.user.username)
        .addField(lang.messageEvent.quickbotinfo, `
  ${lang.messageEvent.quickusers} ${client.users.cache.size}
  ${lang.messageEvent.quickservers} ${serverCount}
  ${lang.messageEvent.quickcreatedon} 1/1/2021`)
        .addField(lang.messageEvent.quicksysteminfo,
          `${lang.messageEvent.quickram}  ${(process.memoryUsage().heapUsed /
            1024 / 1024).toFixed(2)}MB
  ${lang.messageEvent.quickbotuptime} ${uptime}
  ${lang.messageEvent.quickdjsv} ${version}
  ${lang.messageEvent.quicknodev} ${nodev}
  ${lang.messageEvent.quickbotping} ${Math.round(client.ws.ping)}ms`)
        .addField(lang.messageEvent.quicksupport, "https://discord.gg/wcM7ymtYTA", true)
        //.addField("Vote Us", "Soon"
        .addField("Servers : ", `${serverCount}`)
        // .addField("**Permissions**", memberPermissions) 
        .setColor('#0099ff');
      message.channel.send(embed);
    }

    if (message.content.startsWith(prefix)) {
      // Is this a valid cmdName?
      if (!cmd || cmdName === '') return message.reply("woah !")
      // Delete the executors message.
      if (config.deleteCommands && !message.deleted) {
        if (message.deletable) {
          message.delete().catch(console.error)
        }
      }
      //   // Is the cmdName only available in guilds?
      //   if (!message.guild && cmd.guildOnly) return client.embed.send(message, { desc: lang.messageEvent.guildonly })
      // ///nsfw 

      if (cmd.nsfwOnly && cmd.nsfwOnly === true && !message.channel.nsfw && !config.ownerID.includes(message.author.id)) {
        return message.channel.send("This channel is not a NSFW channel!");
      }
      //botMaintenance
      const maintenanceEmbed = new MessageEmbed()
        .setTitle(lang.messageEvent.titlemaintance)
        .setDescription(lang.messageEvent.descmaintance)
        .setImage("https://images.app.goo.gl/LAYT4x423ZCTagNx5")
        .setColor("blue")
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();
      if (config.botMaintenance && !config.ownerID.includes(message.author.id)) return message.channel.send(maintenanceEmbed);

      if (cmd.ownerOnly && !config.ownerID.includes(message.author.id)) {
        return message.reply(lang.messageEvent.ownercommands);
      }
      if (!cooldown.has(cmd.name)) cooldown.set(cmd.name, new Collection());
      const member = message.member,
        now = Date.now(),
        timestamps = cooldown.get(cmd.name),
        cooldownAmount = (cmd.cooldown || 3) * 1000;
      if (!timestamps.has(member.id)) {
        if (member.id !== config.ownerID) {
          timestamps.set(member.id, now);
        }
      } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send(lang.messageEvent.coold + "`" + Math.round(timeLeft) + "` Scounds");
        }
        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
      }
      if (cmd) {
        cmd.run(client, message, cmdArgs, lang);
      }
    }
  }
}