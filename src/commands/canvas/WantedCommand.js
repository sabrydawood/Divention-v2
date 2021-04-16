const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');
const path = require('path');
const { sepia, centerImagePart } = require('../../utils/functions/Canvas');

module.exports = class WantedCommand extends BaseCommand {
  constructor() {
    super(
      'wanted', //command name
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
    const image = user.displayAvatarURL({ format: 'png', size: 512 })
  
  try {
        const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'wanted.png'));
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        const { x, y, width, height } = centerImagePart(data, 430, 430, 150, 360);
        ctx.drawImage(data, x, y, width, height);
        sepia(ctx, x, y, width, height);
        return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'wanted.png' }] });
      } catch (err) {
        return message.reply(lang.avatHide.err + ` \`${err.message}\`.`);
      }
  
  
  
  }
}