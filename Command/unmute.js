const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete();

    const user = message.mentions.members.first()
	if(message.member.hasPermission("BAN_MEMBERS")){
        let muteRole = user.roles.cache.find(r => r.name === "PatouuuMute")
        if(!muteRole){
            message.author.send("Cet personne n'est pas mute !")
        }else{
            user.roles.remove(muteRole)
        }
	}else{
		message.author.send("Tu n'a pas la permission de faire cet commande !")
	}

}


module.exports.help = {
    name: 'unmute'
};