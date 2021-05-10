const Discord = require('discord.js');

module.exports.run = (client, message) => {
    
         
        let lien =  new Discord.MessageEmbed()
        .setColor('#6100FF')
        .setTitle(`Lien d'invitation du bot`)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
        .setDescription('Invite moi dans ton serveur en cliquant [ici](https://discord.com/oauth2/authorize?client_id=744170993668587540&scope=bot&permissions=2146958847).')
        .setTimestamp() 
        .setFooter(`Commande by Phénix Team's`)
        
        message.channel.send(lien)
    

}

module.exports.help = {
    name: 'botinvite'
}
