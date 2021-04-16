const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('superagent');
const path = require('path');
const { streamToArray } = require('../../utils/functions/Util');
const { centerImagePart } = require('../../utils/functions/Canvas');
const frameCount = 10;

module.exports = class PetpetCommand extends BaseCommand {
  constructor() {
    super(
      'petpet', //command name
      'canvas', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args) {
    const user = message.mentions.users.first() || message.author;
    const image = user.displayAvatarURL({ format: 'png', size: 128 })

    try {
      const { body } = await request.get(image);
      const data = await loadImage(body);
      const encoder = new GIFEncoder(112, 112);
      const canvas = createCanvas(112, 112);
      const ctx = canvas.getContext('2d');
      const stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(20);
      encoder.setQuality(200);
      encoder.setTransparent('#000000');
      let squish = 0;
      for (let i = 0; i < frameCount; i++) {
        const frameID = `frame_${i.toString().padStart(2, '0')}.png`;
        const frame = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'pet', frameID));
        const { x, y, width, height } = centerImagePart(data, 75, 75, 27, 38);
        ctx.drawImage(data, x, y + squish, width, height - squish);
        ctx.drawImage(frame, 0, 0);
        encoder.addFrame(ctx);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (i + 1 > frameCount / 2) squish -= 4;
        else squish += 4;
      }
      encoder.finish();
      const buffer = await streamToArray(stream);
      return message.channel.send({ files: [{ attachment: Buffer.concat(buffer), name: 'pet.gif' }] });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}