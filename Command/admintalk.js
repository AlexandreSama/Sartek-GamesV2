const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.delete()

    const filter = message => message.author.id == message.author.id;
    
    if(message.author.id === "724693796499095552" || message.author.id === "256892994504884224"){
        await message.channel.send("Quel serveur choisissez-vous ?").then(res => {
            res.channel.awaitMessages(filter, {max: 1}).then(response => {
                let guild = client.guilds.cache.get(response.first().content)
                message.channel.send("Que voulez-vous dire au créateur du serveur ?").then(res2 => {
                    res2.channel.awaitMessages(filter, {max: 1}).then(responseAdmin => {
                        guild.owner.send("**Bonjour/Bonsoir, vous avez reçu un message de la part de mes créateurs ! Voici ce qu'il contient :** \n\n" + responseAdmin.first().content)
                        message.channel.send("Message envoyé avec succés !")
                    })
                })
            })
        })
    }else{
        message.channel.send("Qu'a tu donc cru pouvoir faire ? :eyes:")
    }
}

module.exports.help = {
    name: 'admintalk'
};
