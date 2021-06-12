const Discord = require('discord.js');

module.exports.run = (client, message) => {
    
         
        let lien =  new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle(`Lien d'invitation du discord officiel`)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
        .setDescription('Tu souhaite rejoindre le serveur discord officiel du bot ? Clique [ici](https://discord.gg/phenixmg).')
        .setTimestamp() 
        .setFooter(`Commande by Phénix Team's`)
        
        message.channel.send(lien)
    

}

module.exports.help = {
    name: 'discord'
}
