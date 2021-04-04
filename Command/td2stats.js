const Discord = require('discord.js');
const snekfetch = require('snekfetch')

module.exports.run = async(client, message, args) => {

    message.delete()

	let saybot = args.join('_'); 
    const url2 = `https://public-api.tracker.gg/v2/division-2/standard/profile/uplay/${saybot}`
	snekfetch.get(url2, {
		headers: 
		{'TRN-Api-Key' : "4475e25c-5ffd-4ded-9994-499ff6f8ba55"},
	}).then(b => {
		let stats = b.body['data']['segments'][0]['stats'];
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.username)
			.setTitle("Stat de " + saybot)
			.addField("Temps de jeu : ", stats['timePlayed']['displayValue'], true)
			.addField("Argent : ", stats['eCreditBalance']['displayValue'], true)
			.addField("Kill PvP : ", stats['killsPvP']['displayValue'], true)
			.addField("Kill NPC : ", stats['killsNpc']['displayValue'], true)
			.addField("Headshot : ", stats['headshots']['displayValue'], true)
			.addField("XP PvE : ", stats['xPPve']['displayValue'], true)
			.addField("XP PvP : ", stats['xPPvp']['displayValue'], true)
			.addField("Niveau DZ : ", stats['rankDZ']['displayValue'], true)
			.addField("Expérience du clan : ", stats['xPClan']['displayValue'], true)
		message.channel.send(embed)
    })
} 

module.exports.help = {
    name: 'td2stats'
};
