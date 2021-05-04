const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let channel = message.channel;
    if(message.members.hasPermission("BAN_MEMBERS")){
        channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false })
        message.channel.send("Le channel est bien clos")
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }

}

module.exports.help = {
    name: 'lockdown'
};