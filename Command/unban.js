const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete();

	if(message.member.hasPermission("BAN_MEMBERS")){
        let arguments = args.join("")
		message.guild.members.unban(arguments)
        .then(user => message.author.send(user.username + " a bien été unban"))
        .catch(console.error)
	}else{
		message.author.send("Tu n'a pas la permission de faire cet commande !")
	}

}


module.exports.help = {
    name: 'unban'
};