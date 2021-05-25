
const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if (message.member.hasPermission("ADMINISTRATOR")) {
        if(args[0] == undefined){
            message.channel.send("ERROR! Il manque des choses , (startgivaway temps (en ms) nombre de gagnats et le lot à win)")
        }
    client.giveawaysManager.start(message.channel, {
        time: ms(args[0]),
        winnerCount: parseInt(args[1]),
        prize: args.slice(2).join(' ')
    }).then((gData) => {
        console.log(gData); // {...} (messageID, end date and more)
    });  
} else {
    message.author.send("Tu n'a pas la permission de faire cet commande !")
}
} 

module.exports.help = {
    name: 'startgiveaway'
};
