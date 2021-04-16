const BaseCommand = require('../../utils/structures/BaseCommand');
const { MersenneTwister19937, integer } = require('random-js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('superagent');
const path = require('path');
const { percentColor } = require('../../utils/functions/Util');
const { GIRLFRIEND_USER_ID } = "800008189679763466";
const { ownerID } = require("../../json/config.json")
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Pinky Cupid.otf'), { family: 'Pinky Cupid' });
const percentColors = [
  { pct: 0.0, color: { r: 0, g: 0, b: 255 } },
  { pct: 0.5, color: { r: 255 / 2, g: 0, b: 255 / 2 } },
  { pct: 1.0, color: { r: 255, g: 0, b: 0 } }
];

module.exports = class ShipCommand extends BaseCommand {
  constructor() {
    super(
      'ship', //command name
      'canvas', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args) {

    const first = message.mentions.users.first()
    const second = message.author
    let level;
    const self = first.id === second.id;
    const owner = ownerID.includes(first) || ownerID.includes(second);
    const authorUser = first.id === message.author.id || second.id === message.author.id;
    const botUser = first.id === client.user.id || second.id === client.user.id;
    const girlfriendUser = first.id === GIRLFRIEND_USER_ID || second.id === GIRLFRIEND_USER_ID;
    if (owner && botUser) {
      level = 0;
    } else if (self) {
      level = 100;
    } else if (girlfriendUser && owner) {
      level = 100;
    } else {
      const calculated = Math.abs(Number.parseInt(BigInt(first.id) - BigInt(second.id), 10));
      const random = MersenneTwister19937.seed(calculated);
      level = integer(0, 100)(random);
    }
    const firstAvatarURL = first.displayAvatarURL({ format: 'png', size: 512 });
    const secondAvatarURL = second.displayAvatarURL({ format: 'png', size: 512 });
    try {
      const firstAvatarData = await request.get(firstAvatarURL);
      const firstAvatar = await loadImage(firstAvatarData.body);
      const secondAvatarData = await request.get(secondAvatarURL);
      const secondAvatar = await loadImage(secondAvatarData.body);
      const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'ship.png'));
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(firstAvatar, 70, 56, 400, 400);
      ctx.drawImage(secondAvatar, 730, 56, 400, 400);
      ctx.drawImage(base, 0, 0);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#ff6c6c';
      ctx.font = '40px Pinky Cupid';
      ctx.fillText('~Divination\'s Compatability Meter~', 600, 15);
      ctx.fillStyle = 'white';
      ctx.fillText(first.username, 270, 448);
      ctx.fillText(second.username, 930, 448);
      ctx.font = '60px Pinky Cupid';
      ctx.fillStyle = percentColor(level / 100, percentColors);
      ctx.fillText(`~${level}%~`, 600, 230);
      ctx.fillText(this.calculateLevelText(level, self, owner, authorUser, botUser), 600, 296);
      ctx.font = '90px Pinky Cupid';
      ctx.fillText(level > 49 ? '❤️' : '💔', 600, 100);
      return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'ship.png' }] });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
  calculateLevelText(level, self, owner, authorUser, botUser) {
    if (owner && botUser) {
      if (authorUser) return 'Pervert';
      else return 'Yuck';
    }
    if (self) return 'Narcissist';
    if (level === 0) return 'Abysmal';
    if (level > 0 && level < 10) return 'Horrid';
    if (level > 9 && level < 20) return 'Awful';
    if (level > 19 && level < 30) return 'Very Bad';
    if (level > 29 && level < 40) return 'Bad';
    if (level > 39 && level < 50) return 'Poor';
    if (level > 49 && level < 60) return 'Average';
    if (level > 59 && level < 70) {
      if (level === 69) return 'Nice';
      return 'Fine';
    }
    if (level > 69 && level < 80) return 'Good';
    if (level > 79 && level < 90) return 'Great';
    if (level > 89 && level < 100) return 'Amazing';
    if (level === 100) return 'Soulmates';
    return '???';
  }
}