const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('superagent');
const path = require('path');
const { streamToArray } = require('../../utils/functions/Util');
const { drawImageWithTint } = require('../../utils/functions/Canvas');
const coord1 = [-25, -33, -42, -14];
const coord2 = [-25, -13, -34, -10];

module.exports = class TriggeredCommand extends BaseCommand {
  constructor() {
    super(
      'triggered', //command name
      'canvas', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {


    const user = message.mentions.users.first() || message.author;


    const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });
    try {
      const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'triggered.png'));
      const { body } = await request.get(avatarURL);
      const avatar = await loadImage(body);
      const encoder = new GIFEncoder(base.width, base.width);
      const canvas = createCanvas(base.width, base.width);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, base.width, base.width);
      const stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(200);
      for (let i = 0; i < 4; i++) {
        ctx.drawImage(avatar, coord1[i], coord2[i], 300, 300);
        ctx.drawImage(base, 0, 218, 256, 38);
        encoder.addFrame(ctx);
      }
      encoder.finish();
      const buffer = await streamToArray(stream);
      return message.channel.send({ files: [{ attachment: Buffer.concat(buffer), name: 'triggered.gif' }] });
    } catch (err) {
      return message.reply(lang.avatHide.err + ` \`${err.message}\`. `);
    }





  }
}