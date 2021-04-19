// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
const BaseEvent = require('../../utils/structures/BaseEvent');
const path = require("path");
const { registerFont } = require('canvas')
registerFont("./src/assets/fonts/mic.ttf", { family: "cairo" })
const { Canvas, resolveImage } = require("canvas-constructor");

const getWelcomeChannel = (guildId, channel) => db.get(`welcome_${guildId}`);

const getWelcomeMsg = (guildId, channel) => db.get(`byeMsg_${guildId}`);


module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  async run(client, member) {
    const GuildConf = require("../../database/schemas/Guild")
    const guildConf = await GuildConf.findOne({ guildId: member.guild.id }) || await GuildConf.create({ guildId: member.guild.id })
    let language = guildConf.language
    if (!language) language = "en";
    const lang = require(`../../lang/${language}`);
    const welcomeChannel = guildConf.memberLogChannel 
    const dpimg = guildConf.welcomeBg


    if (member.user.username.length > 25)
      member.user.username = member.user.username.slice(0, 25) + '...';
    if (member.guild.name.length > 15)
      member.guild.name = member.guild.name.slice(0, 15) + '...';
    const welcomeMsg = guildConf.goodByeMessage
    const welcomeMessga = welcomeMsg
      .replace('-member-', `${member.user.tag}`)
      .replace('-guild-', `${member.guild.name}`)


    const defualt = path.join(__dirname, '..', '..', 'assets', 'images', 'welcomeBg.jpeg')
    const pic = dpimg || defualt;
    const nocolor = path.join(__dirname, '..', '..', 'assets', 'images', 'noBackground.png')

    const online = member.guild.members.cache.filter(member => member.presence.status !== "offline").size
    const ofline = member.guild.members.cache.filter(member => member.presence.status == "offline").size
    const bots = member.guild.members.cache.filter(m => m.user.bot).size;
    const users = member.guild.members.cache.size;

    async function createCanvas() {
      const image = await resolveImage(pic);
      const nocolorback = await resolveImage(nocolor);
      const useravatar = await member.user.avatarURL({ format: "png" }) || "https://cdn.discordapp.com/attachments/800006985529556996/800023551112511488/horizontal.png"

      const guildavatar = await member.guild.iconURL({ format: "png" }) || "https://cdn.discordapp.com/attachments/800006985529556996/800023551112511488/horizontal.png"

      const avatar = await resolveImage(useravatar);
      const gavatar = await resolveImage(guildavatar);

      return new Canvas(1024, 900)
        .printImage(nocolorback, 0, 0, 1024, 900)
        .printRoundedImage(image, 0, 0, 1024, 700, 20)
        .setColor("aqua")
        .printCircle(512, 155, 120)
        .printCircularImage(avatar, 512, 155, 115)
        // footer react x, y , width, hight, radios
        .setColor("aqua")
        .printRoundedRectangle(30, 720, 950, 150, 20)
        //members statues
        //total
        .setTextAlign("center")
        .setColor("DarkOrchid")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(lang.memAdd.mem, 190, 770)
        //total number
        .setTextAlign("center")
        .setColor("red")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(users, 320, 770)
        //online 
        .setTextAlign("center")
        .setColor("DarkOrchid")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(lang.memAdd.on, 650, 770)
        //online number
        .setTextAlign("center")
        .setColor("red")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(online, 750, 770)
        //ofline
        .setTextAlign("center")
        .setColor("DarkOrchid")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(lang.memAdd.off, 200, 850)
        //ofline number
        .setTextAlign("center")
        .setColor("red")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(ofline, 300, 850)
        //bots
        .setTextAlign("center")
        .setColor("DarkOrchid")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(lang.memAdd.bots, 650, 850)
        //bots number
        .setTextAlign("center")
        .setColor("red")
        .setTextSize(40)
        .setTextFont("cairo")
        .printText(bots, 750, 850)
        //guild avatar
        .printCircle(480, 800, 55)
        .printCircularImage(gavatar, 480, 800, 50)
        .setTextAlign("center")
        .setColor("red")
        .setTextSize(70)
        .setTextFont("cairo")
        .printText("GOODBYE", 512, 355, 1024, 450)
        .setTextAlign("center")
        .setColor("#ffffff")
        .setTextSize(70)
        .printText(member.user.username, 512, 495)
        .setTextAlign("center")
        .setColor("#ffffff")
        .setTextSize(70)
        .printText(member.guild.name, 512, 590)
        .toBufferAsync();
    };


    if (!welcomeChannel) return;
    try {
      const c = await client.channels.fetch(welcomeChannel);
      c.send(welcomeMessga,{ files: [{ attachment: await createCanvas(), name: "Bye.png" }] });
    } catch (error) {
      console.error(error);
    }
  }
}