const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let cooldown = parseInt("0")

    if(message.members.hasPermission("BAN_MEMBERS")){
        message.channel.setRateLimitPerUser(cooldown).then(() => {
            message.channel.send(`**Fin du slowmode**`);
        });
    }else{
        
    }

}

module.exports.help = {
    name: 'rcooldown'
};