const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    console.log(client.user.tag + ' has logged in.');
    const serverCount = client.guilds.cache.size;
    const userCount = client.users.cache.size;
    //   guild.members.cache.get
    const channelCount = client.channels.cache.size;
    const statuses = [
      `servers : [${serverCount}]`,
      "Mention Me For help",
      ` users : [${userCount}]`,
      `${channelCount} channels`,
      ` 9help `,
      "ping me"

    ];

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, {
        type: "STREAMING",
        URL: "https://www.youtube.com/channel/UCJRFxBrnUSY-xDLBvvWXtOQ"
      });
    }, 10000);
  }
}