const BaseCommand = require('../../utils/structures/BaseCommand');
const { Attachment } = require('discord.js');
const { registerFont } = require('canvas');
const { Canvas, resolveImage } = require('canvas-constructor');
registerFont('./src/assets/fonts/mic.ttf', { family: 'cairo' });

module.exports = class ColorsCommand extends BaseCommand {
  constructor() {
    super(
      'colors', //command name
      'utils', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      5 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {
    var x = 0;
    var y = 0;
    if (message.guild.roles.cache.filter(role => !isNaN(role.name)).size <= 0)
      return message.reply("sorry this guild didn't have any colors")
    message.guild.roles
      .cache.filter(role => !isNaN(role.name))
      .sort((b1, b2) => b1.name - b2.name)
      .forEach(() => {
        x += 100;
        if (x > 100 * 12) {
          x = 100;
          y += 80;
        }
      });
  const image = await resolveImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoZi34OZP3scW-0Api87ufgT4qcVMStC26G9tr5mX_Am4nI4W0v77hNK-z&s=10');
      async function createCanvas() {
    
    var xd = new Canvas(100 * 11, y + 350)
      .printRoundedImage(image, 0, 0, 100 * 11, y + 350, 100)
      .setTextBaseline("middle")
      .setColor("black")
      .setTextSize(60)
      .printText(`Colors List`, 375, 40);
    x = 0;
    y = 150;
    message.guild.roles
      .cache.filter(role => !isNaN(role.name))
      .sort((b1, b2) => b1.name - b2.name)
      .forEach(role => {
        x += 75;
        if (x > 100 * 10) {
          x = 75;
          y += 80;
        }
        xd.setTextBaseline("middle")
          .setTextAlign("center")
          .setColor(role.hexColor)
          .printRoundedRectangle(x, y, 60, 60, 15)
          .setColor("black")
        if (`${role.name}`.length > 2) {
          xd.setTextSize(30)
        } else if (`${role.name}`.length > 1) {
          xd.setTextSize(40)
        } else {
          xd.setTextSize(50)
        }
        xd.printText(role.name, x + 30, y + 30);
      })
           //end profile toBufferAsync
      //	
    return xd.toBuffer()
  }
  message.channel.send({
    files: [{ attachment: await createCanvas(), name: 'colors.png' }]
  });  }
}