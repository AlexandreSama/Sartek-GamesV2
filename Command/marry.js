const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    if (message.mentions.users.size < 1) return message.channel.send("Tu ne peut pas te marier a personne") 
       let user = message.guild.member(message.mentions.users.first()); 
             message.channel.send(`${user} Tu t'est marié avec ${message.author.username} ! Félicitation !!`,{ 
                 embed: { 
                     image: { 
                         url: "https://i.imgur.com/u67QLhB.gif" 
                     } 
                 } 
             }) 


}

module.exports.help = {
    name: 'marry'
};

