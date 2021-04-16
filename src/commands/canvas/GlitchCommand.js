const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');
const { distort } = require('../../utils/functions/Canvas');

module.exports = class GlitchCommand extends BaseCommand {
  constructor() {
    super(
      'glitch', //command name
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
    const image = user.displayAvatarURL({ format: 'png', size: 128 })
    try {
          const { body } = await request.get(image);
          const data = await loadImage(body);
          const canvas = createCanvas(data.width, data.height);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(data, 0, 0);
          distort(ctx, 10, 0, 0, data.width, data.height, 3);
          const attachment = canvas.toBuffer();
          if (Buffer.byteLength(attachment) > 8e+6) return message.reply('Resulting image was above 8 MB.');
          return message.channel.send({ files: [{ attachment, name: 'glitch.png' }] });
        } catch (err) {
          return message.reply(lang.avatHide.err + ` \`${err.message}\`.`);
        }
      
  }
}