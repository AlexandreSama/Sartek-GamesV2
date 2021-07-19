const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.delete()

    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;
    
    await message.channel.send("Quel serveur choisissez-vous ?").then(res => {
        res.channel.awaitMessages(filter, {max: 1}).then(response => {
            let responseServer = response.first().content;
            let serverArray = client.guilds.cache.get(responseServer)
            do {
                if(!serverArray.channels.cache.find(channel => channel.name === "intra-server")){
                    serverArray.channels.create("Intra-server", {type: "text", permissionOverwrites: [{
                        id: serverArray.ownerID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    },
                    {
                        id: serverArray.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                    ]})
                    message.channel.send("Que voulez-vous répondre a cet personne ?").then(res2 => {
                        res2.channel.awaitMessages(filter, {max: 1}).then(response2 => {
                            let sendedMessage = response2.first().content;
                            let filter2 = message => message.author.id == serverArray.owner.id;
                            let channelTalkAdmin = serverArray.channels.cache.find(channel => channel.name === "intra-server")
                            channelTalkAdmin.send("<@" + serverArray.ownerID + ">, vous avez reçu un message de : " + message.author.username + " ! Voici ce qu'il contient : **" + sendedMessage+ "**").then(resIntra => {
                                message.channel.send("**Message Envoyé !**")
                                resIntra.channel.awaitMessages(filter2, {max: 1}).then(responseIntra => {
                                    let resIntras = responseIntra.first().content;
                                    message.channel.send(serverArray.owner.nickname + " Vous a répondu : **" + resIntras + "**")
                                })
                            })
                        })
                    })
                }else{
                    message.channel.send("Que voulez-vous répondre a cet personne ?").then(res2 => {
                        res2.channel.awaitMessages(filter, {max: 1}).then(response2 => {
                            let sendedMessage = response2.first().content;
                            let filter2 = message => message.author.id == serverArray.owner.id;
                            let channelTalkAdmin = serverArray.channels.cache.find(channel => channel.name === "intra-server")
                            channelTalkAdmin.send("<@" + serverArray.ownerID + ">, vous avez reçu un message de : " + message.author.username + " ! Voici ce qu'il contient : **" + sendedMessage+ "**").then(resIntra => {
                                message.channel.send("**Message Envoyé !**")
                                resIntra.channel.awaitMessages(filter2, {max: 1}).then(responseIntra => {
                                    let resIntras = responseIntra.first().content;
                                    message.channel.send(serverArray.owner.nickname + " Vous a répondu : **" + resIntras + "**")
                                })
                            })
                        })
                    })
                }
            } while (message.content === "fin de transmission");
        })
    })
}

module.exports.help = {
    name: 'admintalk'
};
