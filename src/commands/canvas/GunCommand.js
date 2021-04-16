const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');
const path = require('path');

module.exports = class GunCommand extends BaseCommand {
  constructor() {
    super(
      'gun', //command name
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
        const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'gun.png'));
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const canvas = createCanvas(data.width, data.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(data, 0, 0);
        const ratio = (data.height / 2) / base.height;
        const width = base.width * ratio;
        ctx.drawImage(base, data.width - width, data.height - (data.height / 2), width, data.height / 2);
        const attachment = canvas.toBuffer();
        if (Buffer.byteLength(attachment) > 8e+6) return message.reply('Resulting image was above 8 MB.');
        return message.channel.send({ files: [{ attachment, name: 'gun.png' }] });
      } catch (err) {
        return message.reply(lang.avatHide.err + `\`${err.message}\`.`);
      }
    
    
      }
}