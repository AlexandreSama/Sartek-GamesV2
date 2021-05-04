const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    const messageArray = message.content.split(/\s+/g);
    const arg = messageArray.slice(1);
    let cooldown = parseInt(arg[0])

    if(message.members.hasPermission("BAN_MEMBERS")){
        message.channel.setRateLimitPerUser(cooldown).then(() => {
            message.channel.send(`Slowmode de ${cooldown} secondes mis en place !`);
        });
    }else{

    }

}

module.exports.help = {
    name: 'cooldown'
};