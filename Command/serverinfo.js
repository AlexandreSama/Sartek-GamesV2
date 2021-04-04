const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    let guild = message.guild;

    const embed = new Discord.MessageEmbed()
    .setTitle(`Infos du serveur ${guild.name}`)
    .setAuthor(message.author.username)
    .addField("Nombres d'utilisateurs", `${guild.memberCount}`, true)
    .addField("Propriétaire du serveur", `<@${guild.ownerID}>`, true)
    .addField("Role le plus haut", `${guild.roles.highest}`, true)
    .addField("Région du serveur", `${guild.region}`, true)
    .setFooter(guild.id)

    message.channel.send(embed)

}

module.exports.help = {
    name: 'serverinfo'
};