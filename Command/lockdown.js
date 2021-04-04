const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let roleEtudiant = message.guild.roles.cache.find(r => r.name === "Etudiants");
    let channel = message.channel;
    
    channel.updateOverwrite(channel.guild.everyone, { SEND_MESSAGES: false })
    message.channel.send("Le channel est bien clos aux " + roleEtudiant.name)

}

module.exports.help = {
    name: 'lockdown'
};