const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let cooldown = parseInt("0")

    message.channel.setRateLimitPerUser(cooldown).then(() => {
        message.channel.send(`**Fin du slowmode**`);
    });

}

module.exports.help = {
    name: 'rcooldown'
};