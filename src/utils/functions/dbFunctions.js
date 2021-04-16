



const User = require("../../database/schemas/Guild");
const Guild = require("../../database/schemas/user");








/**
 *
 * @param {string} userId
 * @param {string} guildId
 * @returns {{
 * user: {
 *  money: number;
 *  bank: number;
 *  work: number;
 *  xp: number;
 *  daily: number;
 *  weekly: number;
 *  user_id: string;
 *  guild_id: string;
 * },
 * warnings: Array<{reason: string, guild_id: string;user_id: string;}>
 * }}
 */
async function getUserById(userId, guildId) {
  try {
    let user = await User.findOne({ user_id: userId, guild_id: guildId });
    const warnings = await Warning.find({ user_id: userId, guild_id: guildId });

    if (!user) {
      user = await addUser(userId, guildId);
    }

    return {
      user,
      warnings: warnings || [],
    };
  } catch (e) {
    console.error(e);
  }
}


/**
 * Add a user to the database
 * @param {string} userId
 * @param {string} guildId
 */
 async function addUser(userId, guildId) {
    try {
      const user = new User({ user_id: userId, guild_id: guildId });
  
      await user.save();
  
      return user;
    } catch (e) {
      console.error(e);
    }
  }


  
/**
 * Updates user information
 * @param {string} userId Id of the user
 * @param {string} guildId Id of the guild
 * @param {object} data updated data object
 */
async function updateUserById(userId, guildId, data) {
    try {
      if (typeof data !== "object") {
        throw Error("'data' must be an object");
      }
  
      const user = await getUserById(userId, guildId);
  
      if (!user) {
        await addUser(guildId);
      }
  
      await User.findOneAndUpdate({ user_id: userId, guild_id: guildId }, data);
    } catch (e) {
      console.error(e);
    }
  }

  /**
 *
 * @param {string} userId
 * @param {string} guildId
 */
async function removeUser(userId, guildId) {
    try {
      await User.findOneAndDelete({ user_id: userId, guild_id: guildId });
    } catch (e) {
      console.error(e);
    }
  }


  
/**
 * @param {string} guildId
 */
async function getGuildById(guildId) {
    try {
      let guild = await Guild.findOne({ guild_id: guildId });
  
      if (!guild) {
        guild = await addGuild(guildId);
      }
  
      return guild;
    } catch (e) {
      console.log(e);
    }
  }
  
  /**
   * @param {string} guildId
   * @param {object} settings
   */
  async function updateGuildById(guildId, settings) {
    try {
      if (typeof settings !== "object") {
        throw Error("'settings' must be an object");
      }
  
      // check if guild exists
      const guild = await getGuildById(guildId);
  
      if (!guild) {
        await addGuild(guildId);
      }
  
      await Guild.findOneAndUpdate({ guild_id: guildId }, settings);
    } catch (e) {
      console.error(e);
    }
  }

  /**
 * @param {string} guildId
 */
async function addGuild(guildId) {
    try {
      const guild = new Guild({ guild_id: guildId });
      await guild.save();
      return guild;
    } catch (e) {
      console.error(e);
    }
  }
  /**
 * @param {string} guildId
 */
async function removeGuild(guildId) {
    try {
      await Guild.findOneAndDelete({ guild_id: guildId });
    } catch (e) {
      console.error(e);
    }
  }
  function getLanguages() {
  return fs
    .readdirSync("./src/lang/")
    .filter((f) => f.endsWith(".js"))
    .map((la) => la.slice(0, -3));
}
  /**
 * @param {string} guildId
 * @returns {Object} The found language
 */
async function getGuildLang(guildId) {
    try {
      const guild = await getGuildById(guildId);
      return require(`../../lang/${guild?.language || "english"}`);
    } catch (e) {
      console.error(e);
    }
  }
  async function findMember(message, args, allowAuthor) {
    let member;
  
    member = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((m) => m.user.id === args[0]) ||
        message.guild.members.cache.find((m) => m.user.tag === args[0])
    );
  
    if (!member) {
      member = message.guild.member(
        await message.guild.members.fetch(args[0]).catch(() => (member = null))
      );
    }
  
    if (!member && allowAuthor) {
      member = message.member;
    }
  
    return member;
  }
  
module.exports = {
    getUserById,
    addGuild,
    addUser,
    removeUser,
    updateUserById,
    getGuildById,
    updateGuildById,
    removeGuild,
    getGuildLang,
    getLanguages,
    findMember,
  };
  