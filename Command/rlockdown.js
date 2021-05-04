const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let channel = message.channel;
    
    if(message.member.hasPermission("BAN_MEMBERS")){
        channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true })
        message.channel.send("Le channel est de nouveau ouvert")
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }

}

module.exports.help = {
    name: 'rlockdown'
};