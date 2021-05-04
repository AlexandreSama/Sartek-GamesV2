const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let channel = message.channel;
    
    if(message.members.hasPermission("BAN_MEMBERS")){
        channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true })
        message.channel.send("Le channel est de nouveau ouvert")
    }else{

    }

}

module.exports.help = {
    name: 'rlockdown'
};