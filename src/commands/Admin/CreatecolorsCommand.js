const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CreatecolorsCommand extends BaseCommand {
  constructor() {
    super(
      'createcolors', //command name
      'Admin', // command category 
      [], // aliases
      false , // nsfwOnly
      false , //owner only
      3 , // coolDown
      [] // options 
      );
  }

  async run(client, message, args , lang) {

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel
        .send("**You Dont Have** `ADMINISTRATOR` **premission**")
        .then(msg => msg.delete(6000));

  const msg = await client.embed.send(message, { desc: '"<a:timer:803656491982389298>``ُEdaiting Now ...<a:timer:803656491982389298>.``"' }, false)
 
    await message.guild.roles.create({
      data:{
      name: "1",
      color: "#FFFFFF",
      permissions: []
    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "2",
      color: "#FFFAE8",
      permissions: []
    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "3",
      color: "#FFF6D1",
      permissions: []
    },
    reason: "color",
    });
   await message.guild.roles.create({
      data: {
      name: "4",
      color: "#FFF1B9",
      permissions: []

    },
    reason: "color",
    });
   await message.guild.roles.create({
      data: {
      name: "5",
      color: "#FFECA2",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "6",
      color: "#FFE88B",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
        data: {
      name: "7",
      color: "#FFE374",
      permissions: []

    },
    reason: "color",
    });
   await message.guild.roles.create({
      data: {
      name: "8",
      color: "#FFDF5D",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "9",
      color: "#FFDA46",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "10",
      color: "#FFD52E",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "11",
      color: "#FFD117",
      permissions: []

    },
    reason: "color",
    });
        await message.guild.roles.create({
          data: {
      name: "12",
      color: "#FFCC00",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
        data: {
      name: "13",
      color: "#FF99FF",
      permissions: []

    },
    reason: "color",
    });
   await message.guild.roles.create({
      data: {
      name: "14",
      color: "#FF94E8",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "15",
      color: "#FF90D1",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "16",
      color: "#FF8BB9",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "17",
      color: "#FF86A2",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "18",
      color: "#FF828B",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "19",
      color: "#FF7D74",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "20",
      color: "#FF795D",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "21",
      color: "#FF7446",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "22",
      color: "#FF6F2E",
      permissions: []

    },
    reason: "color",
    });
        await message.guild.roles.create({
          data: {
      name: "23",
      color: "#FF6B17",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "24",
      color: "#FF6600",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "25",
      color: "#FF00FF",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "26",
      color: "#FF00E8",
      permissions: []

    },
    reason: "color",
    });
   await message.guild.roles.create({
      data: {
      name: "27",
      color: "#FF00D1",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "28",
      color: "#FF00B9",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "29",
      color: "#FF00A2",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "30",
      color: "#FF008B",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "31",
      color: "#FF0074",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "32",
      color: "#FF005D",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "33",
      color: "#FF0046",
      permissions: []

    },
    reason: "color",
    });
        await message.guild.roles.create({
          data: {
      name: "34",
      color: "#FF002E",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "35",
      color: "#FF0017",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "36",
      color: "#FF0000",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "37",
      color: "#CCFFFF",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "38",
      color: "#CCFAE8",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "39",
      color: "#CCF6D1",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "40",
      color: "#CCF1B9",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "41",
      color: "#CCECA2",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "42",
      color: "#CCE88B",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "43",
      color: "#CCE374",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "44",
      color: "#CCDF5D",
      permissions: []

    },
    reason: "color",
    });
    await message.guild.roles.create({
    data: {
      name: "45",
      color: "#CCDA46",
      permissions: []
    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: { 
      name: "46",
      color: "#CCD52E",
      permissions: []
    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "47",
      color: "#CCD117",
      permissions: []
                  },
      reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "48",
      color: "#CCCC00",
      permissions: []
            },
      reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "49",
      color: "#CC99FF",
      permissions: []
    },
    reason: "color",
    });
    await message.guild.roles.create({
      data: {
      name: "50",
      color: "#CC99F1",
      permissions: []
      },
      reason: "color",
    });

  await client.embed.edit(message,msg, { desc: `<a:5415_WumpusHypesquad:803558462927405076> Done Completed <a:5415_WumpusHypesquad:803558462927405076>`
  }
  )  }
}