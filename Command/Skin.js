const Discord = require('discord.js');
const market = require('steam-market-search').market;  ;

module.exports.run = (client, message, args) => {

    message.delete();
    market.setRequestOptions({
        headers: {
            'Accept-Language': 'fr, en'
        }
    });

    let arguments = args.join(" ")
    console.log(arguments)

    let embed = new Discord.MessageEmbed()
    .setTitle("Recherche pour le skin : " + arguments)
    .setDescription("Recherche sur le Market de CSGO")
    .setAuthor(message.author.username)
    
    market.search(730, `${arguments}`).then(result => {
        console.log(result)
        result.forEach(e => {
            embed.addField("Nom", e.name, true)
            embed.addField("Prix", e.sell_price_text, true)
            embed.addField("Quantité", e.sell_listings, true)
        })
        message.channel.send(embed)
    })
} 

module.exports.help = {
    name: 'skin'
};
