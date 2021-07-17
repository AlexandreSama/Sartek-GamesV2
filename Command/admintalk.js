const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.delete()

    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;
    
    await message.channel.send("Quel serveur choisissez-vous ?").then(res => {
        res.channel.awaitMessages(filter, {max: 1}).then(response => {   
            let responseServer = response.first().content;
            let serverArray = client.guilds.cache.get(responseServer)
            serverArray.fetchInvites().then(invites => {
            let invitationsArray = invites.array()
            message.channel.send("Voici votre invitation : " + "discord.gg/" + invitationsArray[0].code)
            }) 
        })
    })
} 

module.exports.help = {
    name: 'admintalk'
};
