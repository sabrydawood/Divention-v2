const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');
const path = require('path');
const { drawImageWithTint } = require('../../utils/functions/Canvas');

module.exports = class HeartsCommand extends BaseCommand {
  constructor() {
    super(
      'hearts', //command name
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
  const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 })
  
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'hearts.png'));
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(avatar.width, avatar.height);
			const ctx = canvas.getContext('2d');
			drawImageWithTint(ctx, avatar, 'deeppink', 0, 0, avatar.width, avatar.height);
			ctx.drawImage(base, 0, 0, avatar.width, avatar.height);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'hearts.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  
  
  }
}