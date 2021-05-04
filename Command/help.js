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
                        value: "Ex : +ban @Patouuu 10d Pour le plaisir",
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
                        value: "Ex : +setpermission",
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
                ]
            }),
            reactions: {
                '⬅️': 'cmdhelp2',
                '❎': 'delete',
                '➡️': 'cmdhelp4',
                
            }
        },

        //Code pour la troisème page
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
                   
                ]
            }),
            reactions: {
                '⬅️': 'cmdhelp3',
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
