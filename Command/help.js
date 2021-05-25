const {Discord, MessageEmbed} = require('discord.js');
const { Menu } = require('discord.js-menu')


module.exports.run = (client, message) => {

    message.delete();

    let helpMenu = new Menu(message.channel, message.author.id, [
        //Code pour la première page
        {
            //Le nom de la page (pas de l'embed)
            name: 'cmdhelp1',
            //La c'est l'embed
            content: new MessageEmbed({
                //Titre de la page
                title: 'Commandes de modération <Page : 1> !',
                //La description
                description: 'Légende: ➡️: Page suivante | ❎: Fermer le menu help',
                color: "#f71319",
                //La c'est les champs ou tu notera les cmd
                fields: [
                    //Copie a partir de cet accolade
                    {
                        name: "**__ban__:**",
                        value: "Ex : +ban @Patouuu 10d/m raison (d = days , m = minutes choisir l'un ou l'autre)",
                        inline: true
                    },
                    //Jusqu'ici et colle juste en dessous de la dernière (ATTENTION ! Pense a mettre une virgule a chaque fin d'accolade !)
                    {
                        name: "**__mute__:**",
                        value: "Ex : +mute @Patouuu 10m/d Pour le plaisir",
                        inline: true
                    },
                   //Commande warn
                    {
                        name: "**__warn__:**",
                        value: "Ex : +warn @Patouuu tu aime le pain",
                        inline: true
                    },
                     //Commande cooldown
                     {
                        name: "**__cooldown:__**",
                        value: "Ex : +cooldown 10 (le temps se met auto en seconde)",
                        inline: true
                    },
                     //Commande rcooldown
                     {
                        name: "**__rcooldown:__**",
                        value: "Ex : +cooldown (retire le cooldown)",
                        inline: true
                    },
                      //Commande modlogs
                      {
                        name: "**__modlogs:__**",
                        value: "Ex : +modlogs ID de la personne",
                        inline: true
                    },
                    //Commande lockdown
                    {
                        name: "**__lockdown__:**",
                        value: "Ex : +lockdown",
                        inline: true
                    },
                    //Commande rlockdown
                    {
                        name: "**__rlockdown__:**",
                        value: "Ex : +rlockdown",
                        inline: true
                    },
                    {
                        name: "**__setpermission__:**",
                        value: "Ex : +setpermission , crée les permissions pour le rôle mute du bot",
                        inline: true
                    },
                    {
                        name: "**__setting__:**",
                        value: "Ex : +setting, lance le module pour set les différents modules.",
                        inline: true
                    },
                    {
                        name: "**__clear__:**",
                        value: "Ex : +clear [Nombres de messages], permet de clear une grande quantités de messages.",
                        inline: true
                    },
                     
             ]
                
            }),
            //Ici tu a les réactions, que tu peut modifier/ajouter/supprimer a souhait
            reactions: {
        //Ici l'émoji  //La le nom de la page (name) ou de la destination spécial
                '➡️': 'cmdhelp2',
                '❎': 'delete',
            }
        },

        //Code pour la deuxième page
        {
            name: 'cmdhelp2',
            content: new MessageEmbed({
                title: 'Commandes des mini-jeux <Page : 2> !',
                description: 'Légende: ⬅️: Page précédente | ❎: Fermer le menu help | ➡️: Page suivante ',
                color: "#f0c05a",
                fields: [

                    {
                        name: "**__morpion__**" ,
                        value:"+morpion @test",
                        inline:true,
                    },
                    {
                        name: "**__mmorpg__**" ,
                        value:"+mmorpg @user",
                        inline:true,
                    },
                    {
                        name: "**__rps__**" ,
                        value:"+rps",
                        inline:true,
                    },
                ]
                
            }),
            reactions: {
                '⬅️': 'cmdhelp1',
                '❎': 'delete',
                '➡️': 'cmdhelp3',
                
            }
        },

        //Code pour la troisème page
        {
            name: 'cmdhelp3',
            content: new MessageEmbed({
                title: 'Commandes fun <Page : 3> !',
                description: 'Légende: ⬅️: Page précédente | ❎: Fermer le menu help | ➡️: Page suivante ',
                color: "#f0c05a",
                fields: [
                    //Copie a partir de cet accolade
                    {
                        name: "**__8ball__:**",
                        value: "Ex : +8ball Est-ce que je suis beau ?",
                        inline: true
                    },
                    {
                        name: "**__marry__:**",
                        value: "Ex : +marry @killua",
                        inline: true
                    },
                    {
                        name: "**__roblox__:**",
                        value: "Ex : +roblox TonPseudo",
                        inline: true
                    },
                    {
                        name: "**__say__:**",
                        value: "Ex : +say J'ai des bug !",
                        inline: true
                    },
                    {
                        name: "**__td2stats__:**",
                        value: "Ex : +td2stats pseudo uplay , Donne les stats de la personne sur td2!",
                        inline: true
                    },
                    {
                        name: "**__giveaway__:**",
                        value: "Ex : +startgiveaway temps | nombre de participant | cadeau , (startgiveaway 2000 1 GTA) Ps : tout est en ms (millisecondes).",
                        inline: true
                    },
                    {
                        name: "**__punch__:**",
                        value: "Ex : +punch @user ",
                        inline: true
                    },
                    {
                        name: "**__hug__:**",
                        value: "Ex : +hug @user ",
                        inline: true
                    },
                    {
                        name: "**__meurtre__:**",
                        value: "Ex : +meurtre @user ",
                        inline: true
                    },
                  
                ]
            }),
            reactions: {
                '⬅️': 'cmdhelp2',
                '❎': 'delete',
                '➡️': 'cmdhelp4',
                
            }
        },

        //Code pour la quatrième page
        {
            name: 'cmdhelp4',
            content: new MessageEmbed({
                title: 'Commandes Utilitaire <Page : 4> !',
                description: 'Légende: ⬅️: Page précédente | ❎: Fermer le menu help | ➡️: Page suivante ',
                color: "#f0c05a",
                fields: [
                    //Copie a partir de cet accolade
                    {
                        name: "**__serverinfo__:**",
                        value: "Ex : +serverinfo , Donne les stats du serveur?",
                        inline: true
                    },
                    {
                        name: "**__botinfos__:**",
                        value: "Ex : +botinfos, Donne les stats du bot",
                        inline: true
                    },
                    {
                        name: "**__support__:**",
                        value: "Ex : +support , tout est dit dans le nom.",
                        inline: true
                    },
                    {
                        name: "**__convert__:**",
                        value: "Ex : +convert , (+convert 2h , mais il prend aussi d,h,y,s,m).",
                        inline: true
                    },
                    {
                        name: "**__suggest__:**",
                        value: "Ex : +suggest {votre message} , (+suggest Ajouter un rôle Papa).",
                        inline: true
                    },
                   
                   
                ]
            }),
            reactions: {
                '⬅️': 'cmdhelp3',
                '❎': 'delete',
                '➡️': 'cmdhelp5',
            }
        },

        //Code pour la cinquième page
        {
            name: 'cmdhelp5',
            content: new MessageEmbed({
                title: 'Commandes réserver au créateurs  <Page : 5> !',
                description: 'Légende: ⬅️: Page précédente | ❎: Fermer le menu help | ➡️: Page suivante ',
                color: "#f0c05a",
                fields: [

                    {
                        name: "**__broadcast__**" ,
                        value:"+broadcast , Me permet de vous envoyer les maj du bot et les notpatchs.",
                        inline:true,
                    },
                    
                ]
            }),
            reactions: {
                '⬅️': 'cmdhelp4',
                '❎': 'delete',
                
                
            }
        },
    
        //Le temps que le message s'envois
    ], 300000)

    //NE PAS TOUCHER !!!
    helpMenu.start()

    //Il y a des "destinations spécials" que tu peut utiliser si tu a envie, je te les mets en bas si tu veut t'en servir au cas ou

    //      Destination	    Function
    //      first	        Retourne a la première page.
    //      last	        Retourne a la dernière page.
    //      previous	    Retourne a la page d'avant.
    //      next	        Va a la page suivante.
    //      stop	        Enlève les reactions puis ne met plus a jour l'embed.
    //      delete	        Stop le menu puis supprime le message.
}

module.exports.help = {
    name: 'help'
};
