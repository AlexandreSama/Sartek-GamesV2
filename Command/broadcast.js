const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete();

    if(message.author.id === "724693796499095552" || message.author.id === "256892994504884224"){
        client.guilds.cache.each(guild => {
            try {
                let channel = guild.channels.cache.find(channel => channel.name === "maj-patouuu-bot")
                if(channel){
                    channel.overwritePermissions([{
                        id: guild.roles.everyone.id,
                        deny: ['SEND_MESSAGES']
                    }])
                    const arguments = args.join(" ")
                    channel.send(arguments)
                } else{
                    guild.channels.create("maj-patouuu-bot", {
                        type: "text",
                        topic: "Channel ou est noté chaque mise a jour du bot !",
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: ['SEND_MESSAGES']
                            }
                        ]
                    }).then(() => {
                        let channel = guild.channels.cache.find(channel => channel.name === "maj-patouuu-bot");
                        const arguments = args.join(" ")
                        channel.send(arguments)
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

