const Discord = require('discord.js');
const snekfetch = require('snekfetch')

module.exports.run = async(client, message, args) => {

    message.delete()

	let saybot = args.join('_'); 
    const url = `https://api.mojang.com/users/profiles/minecraft/${saybot}`; 
 	snekfetch.get(url).then(a => {
        const url = `https://crafatar.com/renders/body/${a.body.id}`
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setTitle("Skin de " + saybot)
            .setImage(url)
        message.channel.send(embed)
    })
} 

module.exports.help = {
    name: 'skinmc'
};
