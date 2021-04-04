const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let channel = message.channel;
    
    channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false })
    message.channel.send("Le channel est bien clos")

}

module.exports.help = {
    name: 'lockdown'
};