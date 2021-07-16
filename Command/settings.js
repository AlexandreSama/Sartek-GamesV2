const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message) => {

    let guildName = message.guild.name;
    let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
    let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
    let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
    let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');
    var connection = mysql.createConnection({
        host     : config.bdhost,
        user     : config.bdusername,
        password : config.bdpassword,
        port: 3306,
        charset: "utf8mb4"
    });
    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;

    message.delete();

    if(message.member.hasPermission("ADMINISTRATOR") || message.guild.ownerID == message.author.id){

        message.guild.roles.create({
            data : {
              name: "PatouuuMute",
              color: 'YELLOW',
              permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
              mentionable : false,
            },
            reason: 'Role spécifique pour le mute' 
        })
        message.guild.roles.create({
            data : {
              name: "gestionticket",
              color: 'PINK',
              permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
              mentionable : false,
            },
            reason: 'Role spécifique pour la gestion des tickets' 
        })

        //Première question
        message.author.send("Veuillez me donner l'ID du channel ou vous souhaiter set les logs").then(res1 => {
            res1.channel.awaitMessages(filter, {max: 1}).then(collector1 => {
                let idChannelLogs = collector1.first().content;

                //Deuxième question
                message.author.send("Veuillez me donner l'ID de la catégorie ou vous souhaiter set les channels Tickets").then(res2 => {
                    res2.channel.awaitMessages(filter, {max: 1}).then(collector2 => {
                        let idCategoryTicket = collector2.first().content;

                        message.author.send("Veuillez me donner l'ID du channel ou vous souhaiter set les présentations").then(res3 => {
                            res3.channel.awaitMessages(filter, {max: 1}).then(collector3 => {
                                let idChannelPresentation = collector3.first().content;

                                message.author.send("Veuillez me donner l'ID du channel ou vous souhaiter set les présentations").then(res3 => {
                                    res3.channel.awaitMessages(filter, {max: 1}).then(collector3 => {
                                        let idRoleStart = collector3.first().content;
        
                                        connection.query(`USE ${guildNameNoSpace}`, function(error, results) {
                                            if(error){
                                                connection.query(`CREATE DATABASE ${guildNameNoSpace} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`, function(error, results){
                                                    if(error){
                                                        message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                        console.log(error)
                                                    }
                                                    if(results){
                                                        connection.query(`USE ${guildNameNoSpace}`, function(error, results){
                                                            if(error){
                                                                message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                console.log(error)
                                                            }
                                                            if(results){
                                                                connection.query(`CREATE TABLE mutes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT(200) NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR(100) NOT NULL, date TEXT NOT NULL, is_muted TINYINT NOT NULL DEFAULT 1);`, function(error, results){
                                                                    if(error){
                                                                        message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                        console.log(error)
                                                                    }
                                                                    if(results){
                                                                      connection.query(`CREATE TABLE bans ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT(200) NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR(100) NOT NULL, date TEXT NOT NULL, is_banned TINYINT NOT NULL DEFAULT 1 );`, function(error, results){
                                                                        if(error){
                                                                            message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                            console.log(error)
                                                                        }
                                                                        if(results){
                                                                          connection.query(`CREATE TABLE kicks ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT(200) NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date TEXT NOT NULL );`, function(error, results){
                                                                            if(error){
                                                                                message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                                console.log(error)
                                                                            }
                                                                            if(results){
                                                                              connection.query(`CREATE TABLE warns ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT(200) NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date TEXT NOT NULL );`, function(error, results){
                                                                                if(error){
                                                                                    message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                                    console.log(error)
                                                                                }
                                                                                if(results){
                                                                                  connection.query(`CREATE TABLE settings (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, idchannellogs BIGINT(200) NOT NULL, idcategoryticket BIGINT(200) NOT NULL, idchannelpresentation BIGINT(200) NOT NULL, idRoleStart BIGINT(200));`, function(error, results){
                                                                                    if(error){
                                                                                        message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                                        console.log(error)
                                                                                    }
                                                                                    if(results){
                                                                                        if(idRoleStart == "x"){
                                                                                            connection.query(`INSERT INTO settings (idchannellogs, idcategoryticket, idchannelpresentation) VALUES ("${idChannelLogs}", "${idCategoryTicket}", "${idChannelPresentation}")`, function(error, results){
                                                                                                if(error){
                                                                                                    message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                                                    console.log(error)
                                                                                                }
                                                                                                if(results){
                                                                                                    console.log("BDD + Tables construites avec succés");
                                                                                                    message.author.send("Vos paramètres ont bien été enregistré et le rôle PatouuuMute a bien été crée ! (pensez a mettre ce rôle plus haut que celui de vos utilisateurs courants)")
                                                                                                }
                                                                                            })
                                                                                        }else{
                                                                                            connection.query(`INSERT INTO settings (idchannellogs, idcategoryticket, idchannelpresentation, idRoleStart) VALUES ("${idChannelLogs}", "${idCategoryTicket}", "${idChannelPresentation}", "${idRoleStart}")`, function(error, results){
                                                                                                if(error){
                                                                                                    message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                                                                    console.log(error)
                                                                                                }
                                                                                                if(results){
                                                                                                    console.log("BDD + Tables construites avec succés");
                                                                                                    message.author.send("Vos paramètres ont bien été enregistré et le rôle PatouuuMute a bien été crée ! (pensez a mettre ce rôle plus haut que celui de vos utilisateurs courants)")
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                  })
                                                                                }
                                                                              })
                                                                            }
                                                                          })
                                                                        }
                                                                      })
                                                                    }
                                                                  })
                                                              }
                                                            })
                                                        }
                                                    })
                                            }
                                            if(results){
                                                if(idRoleStart == "x"){
                                                    connection.query(`UPDATE settings SET idchannellogs = "${idChannelLogs}", idcategoryticket = "${idCategoryTicket}", idchannelpresentation = "${idChannelPresentation}"`, function(error, results){
                                                        if(error){
                                                            message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                            console.log(error)
                                                        }
                                                        if(results){
                                                            console.log("paramètres modifiés");
                                                            message.author.send("Vos paramètres ont bien été modifié !")
                                                        }
                                                    })
                                                }else{
                                                    connection.query(`UPDATE settings SET idchannellogs = "${idChannelLogs}", idcategoryticket = "${idCategoryTicket}", idchannelpresentation = "${idChannelPresentation}", idRoleStart = "${idRoleStart}"`, function(error, results){
                                                        if(error){
                                                            message.author.send("ERROR ! Veuillez contacter un des créateurs du bot")
                                                            console.log(error)
                                                        }
                                                        if(results){
                                                            console.log("paramètres modifiés");
                                                            message.author.send("Vos paramètres ont bien été modifié !")
                                                        }
                                                    })
                                                }
                                            }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
    }else{
        message.channel.send("Tu n'est pas propriétaire ou administrateur de ce serveur, tu ne peut donc exécuter cet commande");
    }
}

module.exports.help = {
    name: 'settings'
};