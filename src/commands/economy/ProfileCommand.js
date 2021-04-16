const BaseCommand = require('../../utils/structures/BaseCommand');
const path = require("path")
const UserConf = require("../../database/schemas/user")
const { registerFont } = require('canvas');
const { Canvas, resolveImage } = require('canvas-constructor');
registerFont(path.join('src', 'assets', 'fonts', 'mic.ttf'), { family: 'cairo' });
const calculateUserXp = xp => Math.floor(0.1 * Math.sqrt(xp));
const { ownerID } = require("../../json/config.json")
module.exports = class ProfileCommand extends BaseCommand {
  constructor() {
    super(
      'profile', //command name
      'economy', // command category 
      ["p"], // aliases
      false, // nsfwOnly
      false, //owner only
      3, // coolDown
      [] // options 
    );
  }
  async run(client, message, args, lang) {



    const user = message.mentions.users.first() || message.author;
    const calculateUserXp = xp => Math.floor(0.1 * Math.sqrt(xp));
    const UserConfig = await UserConf.findOne({
      discordId: user.id
    })
    const xp = UserConfig.globalXp
    const level = calculateUserXp(xp);
    const minxp = (level * level) / 0.01;
    const maxxp = ((level + 1) * (level + 1)) / 0.01;
    if (!xp) {
      return message.reply(lang.lvl.err);
    }

    const defualt =
      'https://cdn.discordapp.com/attachments/800023817480568852/800730959342207027/unknown.jpeg';

    const bar = ((xp - minxp) / (maxxp - minxp)) * 900;
    let dbpic = UserConfig.profilePic
    let bio = UserConfig.bio 
    let rep = UserConfig.rep || 0;
    let bal = UserConfig.coins || 0;
    const balance = numberWithCommas(m(bal, 2));
    console.log(m(bal, 2));

    if (user.username.length > 25)
      user.username = user.username.slice(0, 25) + '...';
    if (message.guild.name.length > 15)
      message.guild.name = message.guild.name.slice(0, 15) + '...';
    let color;
    const status = user.presence.status;
    if (status === 'online') {
      color = '#43B581';
    } else if (status === 'dnd') {
      color = '#F04747';
    } else if (status === 'idle') {
      color = '#FAA61A';
    } else if (status === 'offline') {
      color = '#747F8E';
    } else {
      color = '#593595';
    }
    try {
      const pic = dbpic || defualt,
        image = await resolveImage(pic),
        image2 = await resolveImage(
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoZi34OZP3scW-0Api87ufgT4qcVMStC26G9tr5mX_Am4nI4W0v77hNK-z&s=10'
        ),
        repicon = await resolveImage(
          'https://cdn.discordapp.com/attachments/800368245218476083/801175906307670066/images.png'
        ),
        coinicon = await resolveImage(
          'https://cdn.discordapp.com/attachments/789269847619010571/799027760998645781/bc64e7380b8b3c24.png'
        ),
        lvlicon = await resolveImage(
          'https://cdn.discordapp.com/attachments/800368245218476083/801178382565376050/unknown.jpeg'
        ),
        xpicon = await resolveImage(
          'https://cdn.discordapp.com/attachments/800368245218476083/801179041062322196/1611086334615.png'
        ),
        useravatar =
          (await user.avatarURL({ format: 'png' })) ||
          'https://cdn.discordapp.com/attachments/800006985529556996/800023551112511488/horizontal.png',
        guildavatar =
          (await message.guild.iconURL({ format: 'png' })) ||
          'https://cdn.discordapp.com/attachments/800006985529556996/800023551112511488/horizontal.png';

      let devs;

      if (ownerID.includes(user.id)) {
        devs = 'https://cdn.discordapp.com/emojis/710995771897413652.png';
      } else {
        devs = 'https://cdn.discordapp.com/emojis/791201372191195156.png';
      }
      //

      const avatar = await resolveImage(useravatar),
        devicons = await resolveImage(devs),
        gavatar = await resolveImage(guildavatar)
      //stspic = await resolveImage(stsspic);
      //start profile
      async function createCanvas() {
        return (
          new Canvas(1024, 1000)
            //main image
            .printImage(image, 0, 0, 1024, 1000)
            //.printRoundedImage(frame, 42, 75, 950, 800, 20)
            //start opacity
            .setGlobalAlpha(0.3)
            //2nd image x,y , width, hight
            .printRoundedImage(image2, 67, 100, 900, 750, 20)
            //rep react x, y , width, hight, radios
            .setColor('aqua')
            .printRoundedRectangle(90, 250, 250, 80, 20)
            //credits react x, y , width, hight, radios
            .setColor('aqua')
            .printRoundedRectangle(700, 250, 250, 80, 20)
            //levl react x, y , width, hight, radios
            .setColor('aqua') //foot react color
            .printRoundedRectangle(90, 350, 300, 80, 20)
            //xp react x, y , width, hight, radios
            .setColor('aqua') //foot react color
            .printRoundedRectangle(650, 350, 300, 80, 20)
            //badges x, y , width, hight, radios
            .setColor('aqua')
            .printRoundedRectangle(90, 580, 857, 120, 20)
            .setGlobalAlpha(1)
            //end opacity
            // footer react x, y , width, hight, radios
            .setColor('aqua')
            .printRoundedRectangle(67, 870, 900, 80, 60)
            // footer rect bar x, y , width, hight, radios
            .setColor('red')
            .printRoundedRectangle(67, 870, bar, 10, 20)

            .setColor('red')
            .printRoundedRectangle(67, 940, bar, 10, 20)
            //user avatar
            .setColor(color)
            .printCircle(512, 170, 125)
            .printCircularImage(avatar, 512, 170, 115)
            .setColor(color)
            .printCircle(512, 290, 25)
            //	.printCircularImage(stspic, 512, 290, 23)
            //server icon  x,y , size
            .printCircle(512, 770, 53)
            .printCircularImage(gavatar, 512, 770, 50)
            ///repicon
            .setColor('DarkOrchid')
            .printCircle(450, 400, 37)
            .printCircularImage(repicon, 450, 400, 35)
            //credits icon
            .printCircle(580, 400, 37)
            .printCircularImage(coinicon, 580, 400, 35)
            ///levelicon
            .printCircle(160, 200, 37)
            .printCircularImage(xpicon, 160, 200, 35)
            //xp icon
            .printCircle(860, 200, 37)
            .printCircularImage(lvlicon, 860, 200, 35)

            //xp x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText('XP :', 95, 300, 250, 80)
            .setColor('#ffffff')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText('XP :', 95, 300, 250, 80)
            //level x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText('Level :', 705, 300, 250, 80)
            .setColor('#ffffff')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText('Level :', 705, 300, 250, 80)
            //db xp x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText(xp, 175, 305, 250, 80)
            .setColor('red')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText(xp, 175, 305, 250, 80)
            // dp level x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText(level, 830, 305, 250, 80)
            .setColor('red')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText(level, 830, 305, 250, 80)
            //rep x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText('Rep :', 95, 400, 250, 80)
            .setColor('#ffffff')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText('Rep :', 95, 400, 250, 80)
            //credits x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText('Credits :', 655, 400, 250, 80)
            .setColor('#ffffff')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText('Credits :', 655, 400, 250, 80)
            //db rep x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText(rep, 195, 405, 250, 80)
            .setColor('red')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText(rep, 195, 405, 250, 80)
            //db credits x, y , width, hight
            //.setTextAlign("center")
            .setTextSize(40)
            .printStrokeText(balance, 810, 405, 250, 80)
            .setColor('red')
            .setTextSize(40)
            .setTextFont('cairo')
            .printText(balance, 810, 405, 250, 80)
            // user bio  x,y ,width, hight
            .setTextAlign('center')
            .setColor('#ffffff')
            .setTextSize(50)
            .setTextFont('cairo')
            .printText(`${user.username}`, 512, 512)
            .printStrokeText(`${user.username}`, 512, 512)
            //bio
            .setTextAlign('center')
            .setColor('#ffffff')
            .setTextSize(50)
            .setTextFont('cairo')
            .printText(bio, 512, 648)
            .setTextFont('cairo')
            .printStrokeText(bio, 512, 648)

            .setColor('red')
            .printRoundedRectangle(95, 590, 100, 100, 100)
            .printRoundedImage(devicons, 95, 590, 100, 100, 100)

            // levl  x,y ,width, hight
            .setTextAlign('center')
            .setColor('DarkOrchid')
            .setTextFont(50)
            .setTextFont('cairo')
            .printText(message.guild.name, 512, 925)
            //end profile
            .toBufferAsync()
        );
      }
      const msg1 = message.channel
        .send(
          '<a:Loading_color:800440558900346880><a:Loading_color:800440558900346880><a:Loading_color:800440558900346880><a:Loading_color:800440558900346880>'
        )
        .then(msg => msg.delete(), 7000);

      message.channel.send({
        files: [{ attachment: await createCanvas(), name: 'profile.png' }]
      });
    } catch (error) {
      console.log(error.message);
      if (user.id == message.author.id) {
        db.set(`background_${message.author.id}`, defualt);
        message.channel.send(
          'invaild data input we have seted background to defualt \n You can use command again to see profile'
        );
      }
    }

  }
}
function m(n, d) {
  (x = ('' + n).length), (p = Math.pow), (d = p(10, d));
  x -= x % 3;
  return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3];
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
