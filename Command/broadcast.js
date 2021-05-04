const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete();

    if(message.author.id === "724693796499095552" || message.author.id === "256892994504884224"){
        client.guilds.cache.each(guild => {
            try {
                let channel = guild.channels.cache.find(channel => channel.name === "maj-patouuu-bot")
                if(channel){
                    channel.send(args)
                    console.log(args)
                } else{
                    guild.channels.create("maj-patouuu-bot", {
                        type: "text",
                        topic: "Channel ou est noté chaque mise a jour du bot !"
                    }).then(() => {
                        let channel = guild.channels.cache.find(channel => channel.name === "maj-patouuu-bot")
                        channel.send(args)
                        console.log(args)
                    })
                }
            } catch (err) {
                console.log("Impossible d'envoyer un message dans le serveur " + guild.name)
            }
        });
    }

}

module.exports.help = {
    name: 'broadcast'
};

