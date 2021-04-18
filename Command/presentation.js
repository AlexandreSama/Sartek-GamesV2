const Discord = require('discord.js');


module.exports.run = (client, message) => {

    let server = message.guild.name;
    let servernospace = server.replace(/\s/g, '')
    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;

    message.author.send("Salut ! Tu veut que je fasse une présentation de toi-même ? Alors c'est parti ! Déjà donne moi ton pseudo ?").then(res1 => {
        res1.channel.awaitMessages(filter, {max: 1}).then(collector1 => {
            let pseudo = collector1.first().content;
            console.log(pseudo)
            message.author.send("Bien, peut tu me donner ton age ?").then(res2 => {
                res2.channel.awaitMessages(filter, {max: 1}).then(collector2 => {
                    let age = collector2.first().content;
                    console.log(age)
                    message.author.send("super, est-ce que tu est étudiant/étudiante ou travaille-tu ? Si tu travaille, tu peut noter le nom de ton job ^^").then(res3 => {
                        res3.channel.awaitMessages(filter, {max: 1}).then(collector3 => {
                            let status = collector3.first().content;
                            console.log(status)
                            message.author.send("excellent, maintenant dit-moi un peu tes hobbies ! (exemple : j'aime les jeux-vidéos, la lecture, etc...)").then(res4 => {
                                res4.channel.awaitMessages(filter, {max: 1}).then(collector4 => {
                                    let hobbies = collector4.first().content;
                                    console.log(hobbies)
                                    const exampleEmbed = new Discord.MessageEmbed()
                                        .setColor("#29a0ab")
                                        .setAuthor(message.author.username)
                                        .setTitle("Présentation de " + message.author.username)
                                        .setDescription("Vous lisez la présentation de " + message.author.username)
                                        .setImage(message.author.displayAvatarURL({dynamic: true}))
                                        .addFields(
                                            { name: "Pseudo :", value: pseudo.toString()},
                                            { name: "Age :", value: age.toString()},
                                            { name: "Status", value: status.toString()},
                                            { name: "Hobbies", value: hobbies.toString()},
                                        )
                                        let channel = message.guild.channels.cache.find(channel => channel.name === "presentations");
                                        channel.send(exampleEmbed)
                                        message.author.send("Parfait, tu peut trouver ta présentation ici : <#" + channel + ">")
                                })
                            })
                        })
                    })
                })
            })
        })
    })

}

module.exports.help = {
    name: 'presentation'
};