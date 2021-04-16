const BaseCommand = require('../../utils/structures/BaseCommand');
const UserConf = require("../../database/schemas/user")
const Discord = require('discord.js');
const Canvas = require('canvas');
const path = require("path")
const { registerFont } = require('canvas');
registerFont(path.join('src', 'assets' , 'fonts' , 'mic.ttf'), { family: 'cairo' });
const ssn = require('short-string-number');
module.exports = class LevelCommand extends BaseCommand {
  constructor() {
    super(
      'level', //command name
      'economy', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

 async run(client, message, args , lang) {
  	const user = message.mentions.users.first() || message.author;
	const calculateUserXp = xp => Math.floor(0.1 * Math.sqrt(xp));
	const UserConfig = await UserConf.findOne({
    discordId : user.id
  })
const xp = UserConfig.globalXp

	//const bar = XP / 2 /8.3333333333333 ;
	const level = calculateUserXp(xp);
	const minxp = (level * level) / 0.01;
	const maxxp = ((level + 1) * (level + 1)) / 0.01;
	if (!xp) {
		return message.reply(lang.lvl.err);
	}

	const canvas = Canvas.createCanvas(1026, 285);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage(
		'https://cdn.discordapp.com/attachments/800368245218476083/800873240594481212/unknown.jpeg'
	);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = 'red';
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 270, 1026, 20);
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.strokeReact = (0, 270, 1026, 20);
	ctx.stroke();
	ctx.fillStyle = 'aqua';
	ctx.globalAlpha = 1;
	ctx.fillRect(0, 270, ((xp - minxp) / (maxxp - minxp)) * 1026, 20);
	ctx.fill();
	ctx.globalAlpha = 1;

	ctx.font = 'bold 25px Arial';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'red';
	ctx.fillText(`XP: ${ssn(xp)}/${ssn(maxxp)}`, 513, 260);

	ctx.textAlign = 'center';
	ctx.fillText(`Level: ${level}`, 513, 220);

	ctx.font = 'bold underline 35px Arial';
	ctx.textAlign = 'left';
	ctx.fillText(`${user.tag}`, 330, 145);

	ctx.arc(170, 135, 125, 0, Math.PI * 2, true);
	ctx.lineWidth = 6;
	ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(
		user.displayAvatarURL({ format: 'png' })
	);
	ctx.drawImage(avatar, 45, 10, 250, 250);

	const attachment = new Discord.MessageAttachment(
		canvas.toBuffer(),
		'rankcard.png'
	);
	return message.channel.send(attachment);


  }
}
	//
	/*
        const canvas = Canvas.createCanvas(1026,285);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/727646236689170433/799509959515439114/unknown.png');
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#000000";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,270,1026,20)
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeReact = (0,270,1026,20)
        ctx.stroke();
        ctx.fillStyle = 'RED';
        ctx.globalAlpha = 1;
        ctx.fillRect(0,270,(((0)/(200))*1026),20); ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.font = 'bold 25px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4a5072';
        ctx.fillText(`XP: ${ssn(xp)}/${ssn(next)}`, 513,260);

        ctx.textAlign = 'center';
        ctx.fillText(`Level: ${level}`, 513,220);

        ctx.font = 'bold underline 35px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${user.tag}`, 330,145)
        ctx.arc(170,135,125,0, Math.PI*2,true)
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.closePath();  
        ctx.clip();
        const avatar = await Canvas.loadImage(user.displayAvatarURL({format: 'png'}));
        ctx.drawImage(avatar,45,10,250,250)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rankcard.png');
*/