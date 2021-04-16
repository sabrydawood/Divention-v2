const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const request = require('superagent');

module.exports = class AvatarfusionCommand extends BaseCommand {
  constructor() {
    super(
      'avatar-fusion', //command name
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
    const baseAvatarURL = user.displayAvatarURL({ format: 'png', size: 512 });
        const overlayAvatarURL = user.displayAvatarURL({ format: 'png', size: 512 });
        try {
          const baseAvatarData = await request.get(baseAvatarURL);
          const baseAvatar = await loadImage(baseAvatarData.body);
          const overlayAvatarData = await request.get(overlayAvatarURL);
          const overlayAvatar = await loadImage(overlayAvatarData.body);
          const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
          const ctx = canvas.getContext('2d');
          ctx.globalAlpha = 0.1;
          ctx.drawImage(baseAvatar, 0, 0);
          ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
          return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'hide-avatar.png' }] });
        } catch (err) {
          return message.reply(lang.avatHide.err + ` \`${err.message}\``);
        }
      }
}