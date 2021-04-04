const Discord = require('discord.js');
const snekfetch = require('snekfetch')

module.exports.run = async(client, message, args) => {

    message.delete()

	let saybot = args.join('_');
    const url1 = `https://public-api.tracker.gg/v2/csgo/standard/search?platform=steam&query=${saybot}`
	snekfetch.get(url1, {
		headers: 
		{'TRN-Api-Key' : "4475e25c-5ffd-4ded-9994-499ff6f8ba55"},
	}).then(b => {
        let userId = b.body['data'][0]['platformUserId'];
        let userPseudo = b.body['data'][0]['platformUserHandle'];
        let url2 = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${userId}`
        snekfetch.get(url2, {
            headers: 
            {'TRN-Api-Key' : "4475e25c-5ffd-4ded-9994-499ff6f8ba55"},
        }).then(c => {
            let stats = c.body['data']['segments'][0]['stats']
            const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.username)
			.setTitle("Stat CSGO de " + userPseudo)
			.addField("Temps de jeu : ", stats['timePlayed']['displayValue'], true)
			.addField("Morts : ", stats['deaths']['value'], true)
			.addField("Kills : ", stats['kills']['value'], true)
            .addField("Headshots : ", stats['headshots']['value'], true)
			.addField("Taux K/D : ", stats['kd']['displayValue'], true)
			.addField("Round gagnées : ", stats['roundsWon']['displayValue'], true)
			.addField("Round perdus : ", stats['losses']['displayValue'], true)
			.addField("score général : ", stats['score']['value'], true)
			.addField("Winrate : ", stats['wlPercentage']['displayValue'], true)
		message.channel.send(embed)
        })
    })
} 

module.exports.help = {
    name: 'csgostats'
};