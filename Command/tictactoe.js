const Discord = require('discord.js');
const { tictactoe } = require('reconlx')

module.exports.run = async(client, message, args) => {

    const member = message.mentions.members.first() 
    if(!member)  return  message.channel.send('Ping un autre joueur pour lancer la partie')
        
    new tictactoe({
        player_two: member, 
        message: message
    })
}

module.exports.help = {
    name: 'ttt'
};