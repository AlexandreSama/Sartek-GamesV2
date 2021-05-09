
const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {
    client.giveawaysManager.start(message.channel, {
        time: ms(args[0]),
        winnerCount: parseInt(args[1]),
        prize: args.slice(2).join(' ')
    }).then((gData) => {
        console.log(gData); // {...} (messageID, end date and more)
    });  
} 

module.exports.help = {
    name: 'startgiveaway'
};
