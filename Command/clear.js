const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete()

	if (message.members.hasPermission("ADMINISTRATOR")) {
        let arguments = args.join("")
        message.channel.bulkDelete(arguments).then(messages => message.channel.send(arguments + " messages supprimés"))
    } else {
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
} 

module.exports.help = {
    name: 'clear'
};
