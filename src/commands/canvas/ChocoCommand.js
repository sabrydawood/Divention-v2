const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');

const direction = ['left', 'right']
const path = require('path');

module.exports = class ChocoCommand extends BaseCommand {

  constructor() {
    super(
      'choco', //command name
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
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'choco.png'));
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillRect(0, 0, base.width, base.height);
			if (direction === 'right') {
				ctx.translate(base.width, 0);
				ctx.scale(-1, 1);
			}
			ctx.drawImage(avatar, 0, 0, 512, 512);
			if (direction === 'right') ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'chocolate-milk.png' }] });
		} catch (err) {
			return message.reply(lang.avatHide.err + ` \`${err.message}\`.`);
		}
  }
}