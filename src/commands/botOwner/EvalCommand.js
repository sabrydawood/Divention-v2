const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super(
      'eval', //command name
      'botOwner', // command category 
      ["e"], // aliases
      false, // nsfwOnly
      true, //owner only
      0, // coolDown
      [] // options 
    );
  }

  async run(client, message, args , lang) {
    const toEval = args.join(" ");
    try {
      let evaled = await eval(toEval);
      const eevaled = typeof evaled;
      evaled = require("util").inspect(evaled, {
        depth: 0,
        maxArrayLength: null,
      });
      const type = eevaled[0].toUpperCase() + eevaled.slice(1);

      const embed = new MessageEmbed()
        .setTitle(lang.BOT_OWNER.EVAL)
        .setDescription(`\`${lang.BOT_OWNER.EVAL_TYPE}:\` ${type}
\`${lang.BOT_OWNER.EVAL_INPUT}:\` \`\`\`js\n${toEval} \`\`\`
\`${lang.BOT_OWNER.EVAL_OUTPUT}:\` \`\`\`js\n${evaled}\`\`\``);
      message.channel.send(embed);
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setTitle(lang.GLOBAL.EVAL_ERROR)
        .setDescription(`\`\`\`${error}\`\`\``);

      message.channel.send(errorEmbed);
    }
  }
}