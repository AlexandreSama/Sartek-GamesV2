
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete()

	var res = ["Oui", "Non", "Peut-être", "Probablement", "Probablement non"]

    if(!args[0]){ 
 		message.channel.send('Posez au moins une question.') 
 		return; 
 	} 
 	// Creates an ambed and picks a random answer from the answer array 
	let embed = new Discord.MessageEmbed() 
	.addField("Question", args, true) 
	.addField("Réponse", (res[Math.floor(Math.random() * res.length)]), true) 
	.setColor('42c2f4') 
	message.channel.send(embed) 
 	// Displays a message in the console if the command was used 
} 

module.exports.help = {
    name: '8ball'
};
