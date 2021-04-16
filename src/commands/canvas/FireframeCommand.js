const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('superagent');
const path = require('path');
const { streamToArray } = require('../../utils/functions/Util');
const { drawImageWithTint } = require('../../utils/functions/Canvas');
module.exports = class FireframeCommand extends BaseCommand {
  constructor() {
    super(
      'fireframe', //command name
      'canvas', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {

    try {  
  const user = message.mentions.users.first() || message.author;
  const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'fire-frame.png'));
			const { body } = await request.get(avatarURL);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			drawImageWithTint(ctx, data, '#fc671e', 0, 0, data.width, data.height);
			ctx.drawImage(base, 0, 0, data.width, data.height);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return message.reply('Resulting image was above 8 MB.');
			return message.channel.send({ files: [{ attachment, name: 'fire-frame.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  }
}