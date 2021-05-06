const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();

    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;
    let Patou = client.users.cache.get("724693796499095552");
    let Alexandre = client.users.cache.get("256892994504884224");

    const embedFirstQuestion = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .setDescription("Centre d'Aide")
        .addFields({
            name: "1", value: "Problèmes Technique avec le Bot", inline: true
        },
        {
            name: "2", value: "Problèmes d'Utilisations du Bot", inline: true
        },
        {
            name: "3", value: "Avoir le Discord des Créateurs", inline: true
        },
        {
            name: "4", value: "Avoir le Site Web de Patouuu", inline: true
        },
        {
            name: "5", value: "récupèrer l'identifiant d'un utilisateur", inline: true
        },
        {
            name: "6", value: "Contacter les Créateurs", inline: true
        })

    const embedOneSelected = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .addFields({
            name: "1", value: "Je n'arrive pas a paramètrer le bot", inline: true
        })

    const embedTwoSelected = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .addFields({
            name: "1", value: "J'ai un souci avec une commande spécifique", inline: true
        },
        {
            name: "2", value: "J'ai un souci avec les commandes de Modérations", inline: true
        },
        {
            name: "3", value: "J'ai un souci avec les commandes Fun", inline: true
        })

    message.author.send(embedFirstQuestion).then(res1 => {
        res1.channel.awaitMessages(filter, {max: 1}).then(collector1 => {
            let firstResponse = collector1.first().content;
            if(firstResponse == "1"){
                message.author.send(embedOneSelected).then(res1to1 => {
                    res1to1.channel.awaitMessages(filter, {max: 1}).then(collector1to1 => {
                        let firstToFirstResponse = collector1to1.first().content;
                        if(firstToFirstResponse == "1"){
                            message.author.send("Veuillez vérifier que le nom de votre serveur ne contient pas d'Emoji ! Si cela ne fonctionne toujours pas, veuillez contacter l'un de mes créateurs afin de résoudre votre problème !")
                        }
                    })
                })
            }else if (firstResponse == "2") {
                message.author.send(embedTwoSelected).then(res2To2 => {
                    res2To2.channel.awaitMessages(filter, {max: 1}).then(collector2T2o2 => {
                        let secondToSecondResponse = collector2T2o2.first().content;
                        if (secondToSecondResponse == "1") {
                            message.author.send("Je vous conseille d'aller sur le Discord de mes Créateurs et de crée un ticket puis de suivre ce format de support : \n - Nom de la commande : \n - Erreur s'il y a : \n - Quel heure : ")
                        }else if (secondToSecondResponse == "2") {
                            message.author.send("Je vous conseille d'aller sur le Discord de mes Créateurs et de crée un ticket puis de suivre ce format de support : \n - Nom du groupe de commande : \n - Heure au moment de l'erreur : ")
                        }else if (secondToSecondResponse == "3") {
                            message.author.send("Je vous conseille d'aller sur le Discord de mes Créateurs et de crée un ticket puis de suivre ce format de support : \n - Nom du groupe de commande : \n - Heure au moment de l'erreur : ")
                        }
                    })
                })
            }else if (firstResponse == "3") {
                message.author.send("Voici le lien du Discord des Créateurs : https://discord.gg/YmRcRgEMw9")
            }else if (firstResponse == "4") {
                message.author.send("Le site est actuellement en Maintenance !")
            }else if (firstResponse == "5") {
                const firstImage = new Discord.MessageAttachment("utils/img/param.png")
                const secondImage = new Discord.MessageAttachment("utils/img/avance.png")
                const thirdImage = new Discord.MessageAttachment("utils/img/mode_developpeur_.png")
                const fourthImage = new Discord.MessageAttachment("utils/img/copier_lid.png")
                message.author.send("Allez dans vos paramètres", firstImage)
                message.author.send("Puis allez dans Avancés", secondImage)
                message.author.send("Activer le Mode Développeur en appuyant sur le bouton rouge", thirdImage)
                message.author.send("Allez sur un de vos serveurs, clic-droit sur un de vos utilisateur (ou maintenez appuyé sur téléphone) et cliquez sur 'Copier L\'Identifiant'", fourthImage)
            }else if (firstResponse == "6") {
                message.author.send("Très bien ! Je contacte les Créateurs de ce pas ! Merci de votre confiance !")
                Patou.send("Bonjour cher créateur ! J'ai une certaine personne du nom de " + message.author.username + " qui souhaiterai vous parler ! Voici son identifiant : " + message.author.id)
                Alexandre.send("Bonjour cher créateur ! J'ai une certaine personne du nom de " + message.author.username + " qui souhaiterai vous parler ! Voici son identifiant : " + message.author.id)
            }
        })
    })
}

module.exports.help = {
    name: 'support'
};