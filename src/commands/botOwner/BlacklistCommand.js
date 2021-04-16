const BaseCommand = require('../../utils/structures/BaseCommand');
const Blacklisted = require("../../database/schemas/Blacklisted");
const { ownerID } = require("../../json/config.json");
const { findMember } =  require("../../utils/functions/dbFunctions")
module.exports = class BlacklistCommand extends BaseCommand {
  constructor() {
      super(
        'blacklist', //command name
        'botOwner', // command category 
        [], // aliases
        false , // nsfwOnly
        true , //owner only
        0 , // coolDown
        ["add", "remove", "view"] // options 
        );
  }

  async run(client, message, args, lang) {
    const type = args[0];
    let member = await findMember(message, args);

    if (!member) member = { username: "N/A", id: args[1], tag: "N/A" };

    if (!type) {
      return message.channel.send(lang.BOT_OWNER.PROVIDE_TYPE);
    }

    if (member.id === client.user.id) {
      return message.channel.send(lang.BOT_OWNER.CANNOT_BL_BOT);
    }

    if (ownerID.includes(member.id)) {
      return message.channel.send(lang.BOT_OWNER.CANNOT_BL_OWNER);
    }

    const users = await Blacklisted.find();

    switch (type) {
      case "view": {
        const usr = users.find((u) => u.user_id === member.id);

        if (!usr) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }

        const embed = BaseEmbed(message)
          .setTitle(`${lang.BOT_OWNER.BLD_STATUS}: ${member.username}`)
          .addField(`${lang.LEVELS.LEVEL}`, "2");

        return message.channel.send({ embed });
      }
      case "add": {
        const existing = users.filter((u) => u.user_id === member.id)[0];
        if (existing) {
          return message.channel.send(lang.BOT_OWNER.ALREADY_BLD.replace("{member}", member.tag));
        }

        const blUser = new Blacklisted({ user_id: member.id });

        await blUser.save();
        break;
      }
      case "remove": {
        if (users === null) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }
        const exists = users.find((u) => u.user_id === member.id);
        if (!exists) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }

        await Blacklisted.findOneAndDelete({ user_id: member.id });
        break;
      }
      default: {
        return message.channel.send(lang.BOT_OWNER.NOT_OPTION.replace("{type}", type));
      }
    }
    return message.channel.send(
      lang.BOT_OWNER.BLACKLISTED_SUCCESS.replace("{member}", member.tag).replace(
        "{type}",
        type === "add" ? lang.BOT_OWNER.BLACKLISTED : lang.BOT_OWNER.UNBLACKLISTED
      )
    );
  }
}