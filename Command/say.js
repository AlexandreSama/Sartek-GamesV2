const Discord = require('discord.js');

module.exports.run = (client, message) => {

    var text = message.content.split(' ').slice(1).join(' ');
    if(!text) return message.channel.send('Utiliser cet commande comme cet exemple : \n**!say message**');
    message.channel.send(text);
    message.delete();
    message.channel.stopTyping();

}

module.exports.help = {
    name: 'say'
};
