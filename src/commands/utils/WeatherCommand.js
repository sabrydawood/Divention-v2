const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = class WeatherCommand extends BaseCommand {
  constructor() {
    super('weather', 'utils', []);
  }

 async run(client, message, args , lang) {
  if (args.length === 0) {
		let errorembed = new MessageEmbed()
			.setTitle(lang.weather.errt)
			.setDescription('Please enter a location!')
			.setColor(config.embedcolor)
			.setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL({dynamic : true}))
		return message.channel.send(errorembed);
	}

	weather.find({ search: args.join(' '), degreeType: 'C' }, function(
		err,
		result
	) {
		if (result.length === 0) {
			let errorembed = new MessageEmbed()
				.setTitle(lang.weather.errt)
				.setDescription(lang.weather.noloction)
				.setColor('red')
				.setTimestamp()
				.setFooter(
					client.user.username,
					client.user.avatarURL({ dynamic: true })
				);
			return message.channel.send(errorembed);
		}

		var current = result[0].current;
		var location = result[0].location;
		if (err) {
			let errorembed = new MessageEmbed()
				.setTitle(lang.weather.errt)
				.setDescription(lang.weather.noloction)
				.setColor(config.embedcolor)
				.setTimestamp()
				.setFooter(
					client.user.username,
					client.user.avatarURL({ dynamic: true })
				);
			return message.channel.send(errorembed);
		}

		let embed = new MessageEmbed()
			.setDescription(`**${current.skytext}**`)
			.setAuthor(lang.weather.f1 + ` ${current.observationpoint}`)
			.setThumbnail(current.imageUrl)
			.setColor('blue')
			.addField(lang.weather.f2 , `UTC${location.timezone}`, true)
			.addField(lang.weather.f3,  location.degreetype, true)
			.addField(lang.weather.f4, `${current.temperature} ` + lang.weather.f5, true)
			.addField(lang.weather.f6, `${current.feelslike} ` + lang.weather.f7, true)
			.addField(lang.weather.f8, current.winddisplay, true)
			.addField(lang.weather.f9, `${current.humidity}%`, true)
			.setTimestamp()
			.setFooter(
				client.user.username,
				client.user.avatarURL({ dynamic: true })
			);
		message.channel.send(embed);
	});  }
}