const Discord = require('discord.js');
const minigames = require('discord-minigames')

module.exports.run = (client, message) => {

    let member = message.mentions.members.first();

    minigames.startBattle(member, message);

}

module.exports.help = {
    name: 'mmorpg'
};