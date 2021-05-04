const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete()

	if (message.member.hasPermission("ADMINISTRATOR")) {
        let arguments = args.join("")
        if(!arguments){
            message.channel.send("Tu dois me donner un nombre de messages a supprimer stp !").then(messsages => setTimeout(messsages.delete(), 60000))
        }else{
            message.channel.bulkDelete(arguments);
            message.channel.send(arguments + " messages supprimés !").then(messsages => setTimeout(messsages.delete(), 60000))
        }
    } else {
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
} 

module.exports.help = {
    name: 'clear'
};
