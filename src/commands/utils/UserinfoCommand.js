const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

const badges = require("../../json/badges.json");
const moment = require("moment");
const formatDate = (date) => moment(date).format("DD/MM/YYYY");
module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super(
      'userinfo', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    
 const member =
 message.guild.members.cache.get(args.join(" ")) ||
 message.mentions.members.first() ||
 message.member;

if (!member) return message.channel.send("User wasn't found!");

const joinedAt = formatDate(member.joinedAt);
const createdAt = formatDate(member.user.createdAt);
const nickname = member.nickname || "None";
const isBot = member.user.bot;
const userFlags = (await member.user.fetchFlags())
 .toArray()
.map((flag) => badges[flag])
 .join(" ");

let statuses = {
 online: "💚",
 idle: "💛",
 dnd: "❤️",
};
const memberPermissions = member.permissions.toArray();
const embedStatus = [];
if (member.presence.status === "offline") embedStatus.push("🖤 Offline");
if (member.presence.clientStatus.web) {
 embedStatus.push(`\n${statuses[member.presence.clientStatus.web]} Web`);
} if (member.presence.clientStatus.mobile) {
 embedStatus.push(
   `\n${statuses[member.presence.clientStatus.mobile]} Mobile`
 );
} if (member.presence.clientStatus.desktop) {
 embedStatus.push(
   `\n${statuses[member.presence.clientStatus.desktop]} Desktop`
 );
}

const roles =
 member.roles.cache
   .filter((r) => r.id !== message.guild.id)
   .sort((a, b) => b.rawPosition - a.rawPosition)
   .map((r) => r)
   .join(" \n ") || "None";
const roleCount = member.roles.cache.filter(
 (r) => r.id !== message.guild.id
).size;

const { username, id, tag } = member.user;

const embed = new MessageEmbed()
 .addField("**Id**", id, true)
 .addField("**Username**", username, true)
 .addField("**Tag**", tag, true)
 .addField("**Server Nickname**", nickname, true)
 .addField("<:BOT:803656383839862834>**Bot**", isBot, true)
.addField("**Badges**", userFlags.length > 0 ? userFlags : "None", true)
 .addField("**Created At**", createdAt, true)
 .addField("**Joined At**", joinedAt, true)
// .addField("**Status**", embedStatus, true)
 .addField(`**Roles (${roleCount})**`, roles)
//.addField("**Permissions**", memberPermissions)
 .setTitle(`${username}'s info`)
 .setColor("BLUE")
 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
 .setTimestamp()
 .setFooter(message.author.username);

message.channel.send(embed);
  }
}