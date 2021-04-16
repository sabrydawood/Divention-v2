const BaseCommand = require('../../utils/structures/BaseCommand');

const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('superagent');
const path = require('path');
const { streamToArray } = require('../../utils/functions/Util');
const { drawImageWithTint } = require('../../utils/functions/Canvas');
const frameCount = 31;

module.exports = class FireCommand extends BaseCommand {
  constructor() {
    super(
      'fire', //command name
      'canvas', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

async run(client, message, args , lang) {
    
  const user = message.mentions.users.first() || message.author;
    
  const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });
try {
const { body } = await request.get(avatarURL);
const avatar = await loadImage(body);
const encoder = new GIFEncoder(avatar.width, avatar.height);
const canvas = createCanvas(avatar.width, avatar.height);
const ctx = canvas.getContext('2d');
const stream = encoder.createReadStream();
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(100);
encoder.setQuality(200);
for (let i = 0; i < frameCount; i += 2) {
  const frameID = `frame-${i.toString().padStart(2, '0')}.png`;
        const frame = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'fire', frameID));
  const ratio = frame.width / frame.height;
  const height = Math.round(avatar.width / ratio);
  drawImageWithTint(ctx, avatar, '#fc671e', 0, 0, avatar.width, avatar.height);
  ctx.drawImage(frame, 0, avatar.height - height, avatar.width, height);
  encoder.addFrame(ctx);
}
encoder.finish();
const buffer = await streamToArray(stream);
return message.channel.send({ files: [{ attachment: Buffer.concat(buffer), name: 'fire.gif' }] });
} catch (err) {
return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
}

  }
}