const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require("node-fetch");
module.exports = class DocsCommand extends BaseCommand {
  constructor() {
    super(
      'docs', //command name
      'botOwner', // command category 
      [], // aliases
      false , // nsfwOnly
      true , //owner only
      0 , // coolDown
      [] // options 
      );
  }

 async run(client, message, args , lang) {

    let query = args.join(" ");
    if (!query) query = await awaitMessages(message);
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;
    const data = await fetch(url).then((res) => res.json());

    if (!data) {
      return message.channel.send(lang.docs.noresult);
    }
    const embed = {
      ...data,
      author: {},
      color: "#7289DA",
      footer: {
        text: message.author.username,
        icon_url: message.author.displayAvatarURL({ dynamic: true }),
      },
    };

    return message.channel.send({ embed });

    async function awaitMessages(message) {
      let responce;

      const filter = (user) => {
        return user.author.id === message.author.id;
      };

      message.channel.send(lang.docs.searchfor);

      await message.channel
        .awaitMessages(filter, { max: 1, time: 120000, errors: ["time"] })
        .then((msg) => {
          const firstMsg = msg.first();
          if (firstMsg.content.toLowerCase() === "cancel")
            return firstMsg.react("👍");
          responce = firstMsg.content;
        })
        .catch(() => {
          message.channel.send(lang.docs.longtime);
        });

      return responce;
    }
  }
}