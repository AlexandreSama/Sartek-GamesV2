const Discord = require('discord.js');

module.exports.run = (client, message) => {

    message.delete()

    const messageArray = message.content.split(/\s+/g);
    const arg = messageArray.slice(1);
    
    const td = ["Balance ton meilleur Skin Roblox", "Envoi ton pire pseudo Roblox ou Discord", "Va ping La Dame et dit lui 'j'aime les bananes'", "A-tu crée ton compte avant tes 13 ans ?", "Tu t'est abonné a la chaine de La Dame ?", "Tu a déjà payé pour des Robux ?", "Avoue, Roblox c'est nul ?", "Adopt Me ou Islands ?"];
    var item = td[Math.floor(Math.random() * td.length)];
    message.channel.send(item)

}

module.exports.help = {
    name: 'td'
};