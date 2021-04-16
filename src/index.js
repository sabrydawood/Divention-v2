require("dotenv").config();
require("./utils/functions/database")
const Discord = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Discord.Client({
  disableMentions : "all",
  fetchAllMembers : true ,
  ws : { properties : { $browser : "Discord iOS"}} ,
  partials : ["MESSAGE", "USER", "REACTION"] ,
});


(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.Token);
})();
