const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');
module.exports = class GayCommand extends BaseCommand {
  constructor() {
    super(
      'gay', //command name
      'canvas', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

 async run(client, message, args) {
 
  const user = message.mentions.users.first() || message.author;
  const image = user.displayAvatarURL({ format: 'png', size: 256 })
      const ha = Math.floor(Math.random() * 100) + 1;
				try{
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'rainbow.png'));
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			ctx.drawImage(base, 0, 0, data.width, data.height);
				ctx.font = 'bold underline 35px Arial';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.fillText(ha + '%', 125,125);

			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return msg.reply('Resulting image was above 8 MB.');
			return message.channel.send({ files: [{ attachment, name: 'rainbow.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  }
}