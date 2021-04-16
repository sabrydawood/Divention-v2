const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { registerFont, canvas, createCanvas } = require('canvas');
registerFont('./src/assets/fonts/mic.ttf', { family: 'cairo' });
registerFont('./src/assets/fonts/Pinky Cupid.otf', { family: 'pinky' });
const { Canvas, resolveImage } = require('canvas-constructor'),
  moment = require('moment'),
  formatDate = date => moment(date).format('DD/MM/YYYY');

module.exports = class ServerCommand extends BaseCommand {
  constructor() {
    super(
      'server', //command name
      'utils', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {



    if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(lang.lang.permss);
    }
    const { guild } = message;
    const {
      name,
      owner,
      memberCount,
      premiumSubscriptionCount,
      premiumTier,
      verified,
      partnered
    } = guild,
      roles = guild.roles.cache.size,
      channels = guild.channels.cache.size,
      emojis = guild.emojis.cache.size,
      createdAt = formatDate(message.guild.createdAt),
      boosts = premiumSubscriptionCount,
      boostLevel = premiumTier,
      isVerified = verified ? 'Yes' : 'No',
      isPartnered = partnered ? 'Yes' : 'No'


    let inviteBanner;

    if (guild.bannerURL()) {
      inviteBanner = guild.bannerURL({
        size: 1024,
        format: 'png',
        dynamic: true
      });
    } else {
      inviteBanner = 'https://cdn.discordapp.com/attachments/805463360228294699/811255668476608522/unknown.jpeg'
    }
    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel,
      memberss = m(memberCount, 3);
    let memwid = 85;
    if (memberss < 100) {
      memwid = 120;
    } else if (memberss > 100) {
      memwid = 85;
    }
    let rolewid;
    if (roles < 100) {
      rolewid = 350;
    } else if (roles < 10) {
      rolewid = 400;
    } else {
      rolewid = 335;
    }

    //
    //console.log(verLevel)
    //NONE, LOW, MEDIUM, HIGH, VERY_HIGH
    let brr;
    let colllevel;
    let mfatext;
    let mfawid;
    let mfafill;
    if (mfaLevel === 0) {
      brr = 1;
      colllevel = '#fff';
      mfatext = 'Disabled';
      mfafill = '#EF73DF';
      mfawid = 315;
    } else {
      brr = 2;
      colllevel = 'red';
      mfatext = 'ENABLED';
      mfawid = 315;
      mfafill = '#4E023E';
    }
    let br;
    let collevel;
    let verynum;
    let filcol;
    let verwid;
    if (verLevel === 'None') {
      br = 0;
      collevel = '#fff';
      verynum = 0;
      fillcol = '#fff';
      verwid = 90;
    } else if (verLevel === 'LOW') {
      br = 0.5;
      collevel = 'green';
      verynum = 1;
      fillcol = '#EF73DF';
      verwid = 110;
    } else if (verLevel === 'MEDIUM') {
      br = 1;
      collevel = 'tomato';
      verynum = 2;
      fillcol = '#B52C98';
      verwid = 85;
    } else if (verLevel === 'HIGH') {
      br = 1.5;
      collevel = 'orange';
      verynum = 3;
      fillcol = '#930C76';
      verwid = 105;
    } else if (verLevel === 'VERY_HIGH') {
      br = 2;
      collevel = 'red';
      verynum = 4;
      fillcol = '#4E023E';
      verwid = 60;
    }

    var features = message.guild.features
      .map(f => {
        var newf = f
          .toLowerCase()
          .replace('_', ' ')
          .replace('_', ' ')
          .replace('_', ' ');
        var capedf = capitalizeFirstLetter(newf);
        return capedf;
      })
      .join(' , ');
    if (!features) features = 'No Features';
    //console.log(boosts)
    //const boostss = 99999
    let boostwid;
    let fontSize;
    if (boosts < 10) {
      boostwid = 565;
      fontSize = '28px cairo';
    } else if (boosts < 100) {
      boostwid = 555;
      fontSize = '28px cairo';
    } else if (boosts < 1000) {
      boostwid = 545;
      fontSize = '28px cairo';
    } else if (boosts > 1000 && boosts < 10000) {
      boostwid = 545;
      fontSize = '24px cairo';
    } else {
      boostwid = 537;
      fontSize = '24px cairo';
    }
    //////
    let imojiewid;
    let imojiefontSize;
    if (emojis < 10) {
      imojiewid = 940;
    } else if (emojis < 100) {
      imojiewid = 910;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const sys = message.guild.systemChannel
    function m(n, d) {
       (x = ('' + n).length) ,  ( p = Math.pow) ,  (d = p(10, d));
      x -= x % 3;
      return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3];
    }
    const wid = 620;
    if (features.length > 25) {
      //	wid = 570;
      features = features.slice(0, 15) + '...';
    }
    let gnamewid;
    if (guild.name.length > 10) {
      gnamewid = 620
      guild.name = guild.name.slice(0, 10) + '...'
    } else {
      gnamewid = 650
    }
    let usernamewid;
    if (message.author.username.length > 10) {
      usernamewid = 150
      message.author.username = message.author.username.slice(0, 10) + '...'
    } else {
      usernamewid = 180
    }



    //background
    const leftImg =
      'https://cdn.discordapp.com/attachments/805463360228294699/811361829678874724/wave.png',
      avatarFrameGuild =
        'https://cdn.discordapp.com/attachments/805463360228294699/811269384714059816/1613492066961.png',
      avatarFrameUser =
        'https://cdn.discordapp.com/attachments/805463360228294699/811261472797753384/1613490185792.png',
      tipImg =
        'https://cdn.discordapp.com/attachments/805463360228294699/811257159840563220/1613488897706.png',
      tipImg2 =
        'https://cdn.discordapp.com/attachments/805463360228294699/811257209421824030/1613488943528.png',
      boosticon =
        'https://cdn.discordapp.com/emojis/798659828289503273.png',
      shape =
        'https://cdn.discordapp.com/attachments/805463360228294699/811257159840563220/1613488897706.png',
      channelIcon = 'https://cdn.discordapp.com/emojis/585783907841212418.png',
      imojies = 'https://cdn.discordapp.com/emojis/761657166335442964.png';
    const ifbooster = message.author.premiumSince ? true : false;

    //message.premiumSince ? 'Yes' : 'No', true;
    let boostericon;
    if (ifbooster === true) {
      boostericon =
        'https://cdn.discordapp.com/attachments/805463360228294699/811703524143923271/unknown.png';
    } else if (ifbooster === false) {
      boostericon =
        'https://cdn.discordapp.com/attachments/805463360228294699/811717958459457577/unknown.png';
      //

      try {
        async function createCanvas() {
          //resolves

          const LeftImg = await resolveImage(leftImg),
            Nav = await resolveImage(inviteBanner),
            ChannelIcon = await resolveImage(channelIcon),
            ImojieIcon = await resolveImage(imojies),
            AvatarFrameGuild = await resolveImage(avatarFrameGuild),
            BoostIcon = await resolveImage(boosticon),
            BoosterIcon = await resolveImage(boostericon),
            AvatarGuild = await resolveImage(guild.iconURL({ format: 'png' })),
            AvatarFrameUser = await resolveImage(avatarFrameUser),
            AvatarUser = await resolveImage(
              message.author.avatarURL({ format: 'png' })
            ),
            shapeIcon = await resolveImage(shape);

          //if(!Avatar) Avatar = await resolveImage('https://i.stack.imgur.com/J4Rvo.png');
          //
          // =	return (
          const ctx = new Canvas(1024, 1024)
            //main react
            .printRoundedImage(Nav, 510, 0, 515, 290, 20)
            .setColor('#000')
            .setStrokeWidth(3)
            .setStroke('#fff')
            .printRoundedRectangle(530, 80, 80, 60, 20)
            .stroke()
            .setColor('#000')
            //.printCircle(570, 60, 40)
            //.stroke()
            .printCircularImage(BoostIcon, 570, 60, 40)
            .setColor('#FF8BB9')
            .setTextFont(fontSize)
            .printText(boosts, boostwid, 125)

            .setColor('#fff')
            .printRoundedRectangle(0, 0, 500, 290, 20)
            .setColor('#FF8BB9')
            .printRoundedRectangle(0, 300, 500, 800, 20)
            //if member boost sever
            .setStrokeWidth(3)
            .setStroke('#000')
            .printCircularImage(BoosterIcon, 440, 60, 40)
            .stroke()
            /*.printLinearColorGradient(0,300, 500,800,[{ color: "green", position: 0 },{ color: "cyan", position: .5 }, { color: "green", positi5n: 5}])*/
            .setColor('#fff')
            .printRoundedRectangle(510, 670, 510, 380, 20)

            //.setColor('#fe3158')
            .printRoundedRectangle(510, 300, 510, 360, 20)
            //main react
            //right react small
            .setColor('#FF8BB9')
            .setStrokeWidth(3)
            .setStroke('#000')
            .printRoundedRectangle(520, 360, 490, 60, 20)
            .stroke()
            .printRoundedRectangle(520, 470, 490, 60, 20)
            .stroke()
            .printRoundedRectangle(520, 580, 490, 60, 20)
            .stroke()
            .printRoundedRectangle(520, 730, 490, 60, 20)
            .stroke()
            .printRoundedRectangle(520, 840, 490, 60, 20)
            .stroke()
            .printRoundedRectangle(520, 950, 490, 60, 20)
            .stroke()
            // react right small
            .setStroke('#fff')
            .setColor('#000')
            .printRoundedRectangle(535, 315, 170, 60, 20)
            .stroke()

            .printRoundedRectangle(535, 425, 170, 60, 20)
            .stroke()

            .printRoundedRectangle(535, 535, 170, 60, 20)
            .stroke()

            .printRoundedRectangle(535, 690, 170, 60, 20)
            .stroke()

            .printRoundedRectangle(535, 795, 170, 60, 20)
            .stroke()

            .printRoundedRectangle(535, 905, 170, 60, 20)
            .stroke()
            .printRoundedRectangle(810, 905, 170, 60, 20)
            .stroke()
            //
            //left react small circle s top
            .setColor('#30C494')
            .setStroke('#68C3F5')
            .setStrokeWidth(10)
            .beginPath()
            .arc(135, 670, 100, 0, 2 * Math.PI)
            .stroke()
            .closePath()
            .setStroke('#fff')
            .beginPath()
            .arc(135, 670, 90, 0, 2 * Math.PI)
            .stroke()
            .fill()
            .closePath()
            //
            .setStroke('#68C3F5')
            .setStrokeWidth(10)
            .beginPath()
            .arc(365, 670, 100, 0, 2 * Math.PI)
            .stroke()
            .closePath()
            .setStroke('#fff')
            .beginPath()
            .arc(365, 670, 90, 0, 2 * Math.PI)
            .stroke()
            .fill()
            .closePath()

            //left react small circle s bottom
            // Verified
            .setColor(fillcol)
            .setStroke('#68C3F5')
            .setStrokeWidth(10)
            .beginPath()
            .arc(135, 900, 100, 0, 2 * Math.PI)
            .stroke()
            .closePath()
            .setStroke(collevel)
            .beginPath()
            .arc(135, 900, 90, 0, br * Math.PI)
            .stroke()
            .fill()
            .closePath()
            // 2fa
            .setColor(mfafill)
            .setStroke('#68C3F5')
            .setStrokeWidth(10)
            .beginPath()
            .arc(365, 900, 100, 0, 2 * Math.PI)
            .stroke()
            //.fill()
            .closePath()
            .setStroke(colllevel)
            .beginPath()
            .arc(365, 900, 90, 0, brr * Math.PI)
            .stroke()
            .fill()
            .closePath()
            //avatar frame && avatar Guild
            .printCircularImage(AvatarFrameGuild, 250, 440, 130)
            .printCircularImage(AvatarGuild, 250, 440, 95)
            //avatar frame && avatar user
            .printCircularImage(AvatarFrameGuild, 250, 100, 90)
            .setColor('#FF8BB9')
            .printCircle(250, 100, 70)
            .printCircularImage(AvatarUser, 250, 100, 62)
            // user box reacts
            .setStrokeWidth(3)
            .setStroke('#000')
            .printRoundedRectangle(20, 220, 450, 60, 20)
            .stroke()
            .setStroke('#fff')
            .setColor('#000')
            .printRoundedRectangle(35, 175, 170, 60, 20)
            .stroke()
            //user box name
            .setColor('#fff')
            .setTextFont('28px cairo')
            .printText('Name', 85, 210)
            .setColor('#000')
            .setTextFont('32px cairo')
            .printText(message.author.username, usernamewid, 260)
            //
            //right small texts
            .setColor('#fff')
            .setTextFont('28px cairo')
            //.setTextAlign('center')
            .printText('Name', 570, 350)
            .printText('Region', 570, 460)
            .printText('System', 570, 570)
            .printText('Created At', 555, 725)
            .printText('Features', 550, 835)
            .printText('Verified?', 560, 940)
            .printText('Partnered?', 820, 940)
            //right big texts
            .setColor('#000')
            .setTextFont('32px cairo')
            .printText(guild.name.toUpperCase(), 680, 400)
            .printText(message.guild.region.toUpperCase(), 680, 510)
            .printText(sys.name, 690, 620)
            .printText(createdAt, 680, 775)
            .printText(features.toUpperCase(), wid, 885)
            .printText(isVerified, 600, 995)
            .printText(isPartnered, 870, 995)
            //left circles texts top members
            .setColor('#FFF')
            .setTextFont('28px cairo')
            .printText('Members', 75, 650)
            .setColor('#FFF')
            .setTextFont('32px cairo')
            .printText(memberss, memwid, 700)
            //
            //left circles texts Roles
            .setColor('#FFF')
            .setTextFont('28px cairo')
            .printText('Roles', 330, 650)
            .setColor('#FFF')
            .setTextFont('32px cairo')
            .printText(roles, rolewid, 700)
            //
            //left circles texts verificationLevel
            .setColor('#fff')
            .setTextFont('28px cairo')
            .printText('Verification', 55, 890)
            .setColor('#fff')
            .setTextFont('25px cairo')
            .printText(verLevel, verwid, 925)
            .printText(verynum, 130, 960)
            //left circles texts 2fa
            .setColor('#fff')
            .setTextFont('28px cairo')
            .printText('2FA Level', 300, 875)
            .setColor('#fff')
            .setTextFont('25px cairo')
            .printText(mfatext.toUpperCase(), mfawid, 915)
            .printText(mfaLevel, 360, 950)
            //
            .setStroke('#68C3F5')
            .setStrokeWidth(10)
            .setGlobalAlpha(0.3)
            .printImage(shapeIcon, 835, 20, 200, 80)
            .setGlobalAlpha(1)
            .printCircle(835, 50, 40)
            .stroke()
            .printImage(ChannelIcon, 800, 15, 70, 70)
            .setGlobalAlpha(0.3)
            .printImage(shapeIcon, 835, 120, 200, 80)
            .setGlobalAlpha(1)
            .printCircle(835, 150, 40)
            .printImage(ImojieIcon, 800, 115, 70, 70)
            .stroke()
            .setColor('#A2F3F7')
            .setTextFont('48px cairo')
            .printText(channels, 910, 80)
            //Text(channels, 910,80)
            .printText(emojis, imojiewid, 180)
            .setColor('#AA28EF')
            .setTextFont('68px pinky')
            .printText(guild.name, gnamewid, 250)
            .toBufferAsync();
          //)
          return ctx;
        }
        console.log(mfaLevel);
        message.channel.send({
          files: [{ attachment: await createCanvas(), name: 'server.png' }]
        });
      } catch (e) {
        if (e) {
          throw e.message;
          message.reply(e.message)
        }
      }

    }

  }
}