const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    const embed = new Discord.MessageEmbed() 
             .setAuthor(client.user.username, client.user.avatarURL) 
             .setColor(0x00A2E8) 
             .addField("Memoire", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MBS", true)
             .addField("Latence", `${message.client.ping}`, true) 
             .addField('Utilisateurs Totales', `${client.users.cache.size}`, true) 
             .addField('Channels Totales', `${client.channels.cache.size}`, true) 
             .addField('Serveurs Totales', Math.ceil(client.guilds.cache.size), true) 
             .addField('Date de création du bot', client.user.createdAt.toLocaleString()) 
             .addField('Librairie', `discord.js 12`, true) 
             .addField('Node.js Version', process.version, true) 
             .addField('Bot Version', "0.1.2", true) 
             .setTimestamp() 
             .setFooter(client.user.username, client.user.avatarURL); 
       message.channel.send(embed) 


}

module.exports.help = {
    name: 'botinfos'
};

