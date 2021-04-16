const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VoteCommand extends BaseCommand {
  constructor() {
    super(
      'vote', //command name
      'utils', // command category 
      [], // aliases
      false, // nsfwOnly
      false, //owner only
      5, // coolDown
      [] // options 
    );
  }

  async run(client, message, args, lang) {
message.channel.send("wait for this man we didn't finish yet")
    // const DBL = require("dblapi.js");
    // const DBLToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMDAwODE4OTY3OTc2MzQ2NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjExNTQ4MzY5fQ.iFmXcOFvAfq01OlVZ3S9mBgxUAULm8Q3EdEEIyv4c7c'
    // const user = message.mentions.users.first() || message.author;
    // const dbl = new DBL(DBLToken, client);
    // dbl.hasVoted(user.id).then(votes => {
    //   if (votes == false) { message.channel.send("It looks like " + user.username + " didn't vote \nGo to vote! https://top.gg/bot/800008189679763466/vote") } else { message.channel.send(user.username + " already voted! \nCome back at a later time.") }
    // });
  }
}