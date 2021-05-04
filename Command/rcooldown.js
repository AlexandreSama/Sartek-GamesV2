const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let cooldown = parseInt("0")

    if(message.member.hasPermission("BAN_MEMBERS")){
        message.channel.setRateLimitPerUser(cooldown).then(() => {
            message.channel.send(`**Fin du slowmode**`);
        });
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }

}

module.exports.help = {
    name: 'rcooldown'
};