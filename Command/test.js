const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete()
    const messageArray = message.content.split(/\s+/g);
    const arg = messageArray.slice(1);

    const embed = new Discord.MessageEmbed()
    .setTitle("Modlogs de l\'ID " + arg[0])
    .setAuthor(`${message.author.username}`)
    .setColor(0x00AE86)
    .setDescription("Modlogs contenant les ban, les mute, les kick et les warn de l\'utilisateur demandé")

    let banArraySecond = []
    let banArrayFirst = []

    var connection = mysql.createConnection({
        host     : config.bdhost,
        user     : config.bdusername,
        password : config.bdpassword,
        database: "PhénixMG",
        port: 3306,
        supportBigNumbers: true,
        bigNumberStrings: true
    });

    connection.connect();

    connection.query(`SELECT raison, moderateur, date FROM warns WHERE iddiscord = ${arg[0]}`, function(error, results){
        if(error){
            console.log(error);
        }if(results){
            var warnData = JSON.stringify(results)
            var warnFinalData = JSON.parse(warnData)
            connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM mutes WHERE iddiscord = ${arg[0]}`, function(error, results) {
                if(error){
                    console.log(error);
                }if(results){
                    var muteData = JSON.stringify(results)
                    var muteFinalData = JSON.parse(muteData)
                    connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM bans WHERE iddiscord = ${arg[0]}`, function(error, results){
                        if(error){
                            console.log(error);
                        }if(results){
                            var banData = JSON.stringify(results)
                            var banFinalData = JSON.parse(banData)
                            connection.query(`SELECT raison, moderateur, date FROM kicks WHERE iddiscord = ${arg[0]}`, function(error, results){
                                if(error){
                                    console.log(error);
                                }if(results){
                                    var kickData = JSON.stringify(results)
                                    var kickFinalData = JSON.parse(kickData)
                                    // console.log(Object.keys(warnFinalData).length)

                                    // for (let index = 5; index < kickFinalData.length; index++) {
                                    //     embed.addField(kickFinalData[index]);
                                    // }
                                    // for (let index = 5; index < warnFinalData.length; index++) {
                                    //     embed.addFields({name: "Raison", value: warnFinalData[index]['raison']});
                                    // }
                                    // for (let index = 5; index < muteFinalData.length; index++) {
                                    //     embed.addFields(muteFinalData[index]);
                                    // }

                                    if(Object.keys(banFinalData).length > 5){
                                        for (let index = 5; index > banFinalData.length; index++) {
                                            banArrayFirst.push(banFinalData[index])
                                            console.log(banFinalData[index])
                                        }
                                        for (let index = 5; index < banFinalData.length; index++) {
                                            banArraySecond.push(banFinalData[index])
                                        }
                                        const embedBanFirst = new Discord.MessageEmbed()
                                        .setDescription("Ban de l'utilisateur")
                                        const embedBanSuite = new Discord.MessageEmbed()
                                        .setDescription("Suite des sanctions")
                                        banArraySecond.forEach(element => {
                                            embedBanSuite.addFields({name: "Raison" , value: element.raison});
                                            embedBanSuite.addFields({name: "Modérateur" , value: element.raison});
                                            embedBanSuite.addFields({name: "Temps de ban" , value: element.raison + element.valeurtemps});
                                            embedBanSuite.addFields({name: "Date" , value: element.date});
                                        });
                                        banArrayFirst.forEach(element => {
                                            embedBanFirst.addFields({name: "Raison" , value: element.raison});
                                            embedBanFirst.addFields({name: "Modérateur" , value: element.raison});
                                            embedBanFirst.addFields({name: "Temps de ban" , value: element.raison + element.valeurtemps});
                                            embedBanFirst.addFields({name: "Date" , value: element.date});
                                        });
                                        message.channel.send(embed)
                                        message.channel.send(embedBanFirst)
                                        message.channel.send(embedBanSuite)
                                    }else{
                                        const embedBan = new Discord.MessageEmbed()
                                        banFinalData.forEach(element => {
                                            embedBan.addFields({name: "Raison" , value: element.raison});
                                            embedBan.addFields({name: "Modérateur" , value: element.raison});
                                            embedBan.addFields({name: "Temps de ban" , value: element.raison + element.valeurtemps});
                                            embedBan.addFields({name: "Date" , value: element.date});
                                        })
                                        message.channel.send(embed)
                                        message.channel.send(embedBan)
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

module.exports.help = {
    name: 'test'
};
