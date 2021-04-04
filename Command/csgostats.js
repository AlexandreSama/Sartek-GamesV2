const Discord = require('discord.js');
const snekfetch = require('snekfetch')

module.exports.run = async(client, message, args) => {

    message.delete()

	let saybot = args.join('_');
    let url2 = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=106794CC3B4908C91129A70CEDD3AFD3&steamid=${saybot}`
    snekfetch.get(url2).then(c => {
		console.log(c.body)
        let stats = c.body['playerstats']['stats']
		console.log(stats)
        const embed = new Discord.MessageEmbed()
		.setAuthor(message.author.username)
		.setTitle("Stat CSGO de " + message.author.username)
		.addField("Temps de jeu : ", stats[2]['value'], true)
		.addField("Morts : ", stats[1]['value'], true)
		.addField("Kills : ", stats[0]['value'], true)
		.addField("Round gagnées : ", stats[5]['value'], true)
		message.channel.send(embed)
    })
} 

module.exports.help = {
    name: 'csgostats'
};