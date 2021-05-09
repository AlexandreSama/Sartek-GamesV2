const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete();

    const messageArray = message.content.split(/\s+/g);
    const arg = messageArray.slice(1);
    let dUser = message.mentions.users.first();

    const embed = new Discord.MessageEmbed()
    .setTitle("Modlogs de l\'ID " + arg[0])
    .setAuthor(`${message.author.username}`)
    .setColor(0x00AE86)
    .setDescription("Modlogs contenant les ban, les mute, les kick et les warn de l\'utilisateur demandé")


    let guildName = message.guild.name;
    let guildNameNoSpace = guildName.replace(/\s/g, '');

    var connection = mysql.createConnection({
        host     : config.bdhost,
        user     : config.bdusername,
        password : config.bdpassword,
        port: 3306,
        supportBigNumbers: true,
        bigNumberStrings: true
    });

    if(message.member.hasPermission("BAN_MEMBERS")){
        if(dUser == undefined){
            connection.query(`USE ${guildNameNoSpace}`, function(error, results){
                if(error){
                    console.log(error)
                }if(results){
                    connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM mutes WHERE iddiscord = ${arg[0]}`, function(error, results){
                        if(error){
                            console.log(error);
                        }if(results){
                            let mute = results;
                            connection.query(`SELECT raison, moderateur, date FROM warns WHERE iddiscord = ${arg[0]}`, function(error, results){
                                if(error){
                                    console.log(error);
                                }if(results){
                                    let warn = results
                                    connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM bans WHERE iddiscord = ${arg[0]}`, function(error, results){
                                        if(error){
                                            console.log(error);
                                        }if(results){
                                            let ban = results;
                                            connection.query(`SELECT raison, moderateur, date FROM kicks WHERE iddiscord = ${arg[0]}`, function(error, results){
                                                if(error){
                                                    console.log(error);
                                                }if(results){
                                                    let kick = results;
        
                                                    var kickData = JSON.stringify(kick)
                                                    var kickFinalData = JSON.parse(kickData)
        
                                                    var warnData = JSON.stringify(warn)
                                                    var warnFinalData = JSON.parse(warnData)
        
                                                    var muteData = JSON.stringify(mute)
                                                    var muteFinalData = JSON.parse(muteData)
        
                                                    var banData = JSON.stringify(ban)
                                                    var banFinalData = JSON.parse(banData)
        
                                                    kickFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            embed.addFields(
                                                                {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                {name: "KICK", value: "-------", inline: false},
                                                                {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                            )
                                                        }
                                                    })
        
                                                    muteFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            if(data.valeurtemps == 'm'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "MUTE", value: "-------", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} minutes`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }if(data.valeurtemps == 'd'){
                                                            embed.addFields(
                                                                {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                {name: "MUTE", value: "-------", inline: false},
                                                                {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                {name: "Temps : ", value: `${data.temps} jours`, inline: false},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                            )}
                                                        }
                                                    })
        
                                                    banFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            if(data.valeurtemps == 'm'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "BAN", value: "-----", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} minutes`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }if(data.valeurtemps == 'd'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "BAN", value: "-----", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} jours`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }
                                                        }
                                                    })
        
                                                    warnFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            embed.addFields(
                                                                {name: "Type", value: "Warn", inline: false},
                                                                {name: `Raison : `, value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: true},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false},
                                                                {name: "\u200b", value: "\u200b", inline: false}
                                                            )
                                                        }
                                                    })
                                                    message.channel.send(embed)
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
        }else{
            connection.query(`USE ${guildNameNoSpace}`, function(error, results){
                if(error){
                    console.log(error)
                }if(results){
                    connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM mutes WHERE iddiscord = ${dUser.id}`, function(error, results){
                        if(error){
                            console.log(error);
                        }if(results){
                            let mute = results;
                            connection.query(`SELECT raison, moderateur, date FROM warns WHERE iddiscord = ${dUser.id}`, function(error, results){
                                if(error){
                                    console.log(error);
                                }if(results){
                                    let warn = results
                                    connection.query(`SELECT raison, temps, valeurtemps, moderateur, date FROM bans WHERE iddiscord = ${dUser.id}`, function(error, results){
                                        if(error){
                                            console.log(error);
                                        }if(results){
                                            let ban = results;
                                            connection.query(`SELECT raison, moderateur, date FROM kicks WHERE iddiscord = ${dUser.id}`, function(error, results){
                                                if(error){
                                                    console.log(error);
                                                }if(results){
                                                    let kick = results;
        
                                                    var kickData = JSON.stringify(kick)
                                                    var kickFinalData = JSON.parse(kickData)
        
                                                    var warnData = JSON.stringify(warn)
                                                    var warnFinalData = JSON.parse(warnData)
        
                                                    var muteData = JSON.stringify(mute)
                                                    var muteFinalData = JSON.parse(muteData)
        
                                                    var banData = JSON.stringify(ban)
                                                    var banFinalData = JSON.parse(banData)
        
                                                    kickFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            embed.addFields(
                                                                {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                {name: "KICK", value: "-------", inline: false},
                                                                {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                            )
                                                        }
                                                    })
        
                                                    muteFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            if(data.valeurtemps == 'm'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "MUTE", value: "-------", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} minutes`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }if(data.valeurtemps == 'd'){
                                                            embed.addFields(
                                                                {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                {name: "MUTE", value: "-------", inline: false},
                                                                {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                {name: "Temps : ", value: `${data.temps} jours`, inline: false},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                            )}
                                                        }
                                                    })
        
                                                    banFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            if(data.valeurtemps == 'm'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "BAN", value: "-----", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} minutes`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }if(data.valeurtemps == 'd'){
                                                                embed.addFields(
                                                                    {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                    {name: "BAN", value: "-----", inline: false},
                                                                    {name: "Raison : ", value: `${data.raison}`, inline: false},
                                                                    {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                    {name: "Temps : ", value: `${data.temps} jours`, inline: false},
                                                                    {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                                )
                                                            }
                                                        }
                                                    })
        
                                                    warnFinalData.forEach(function(data, index) {
                                                        if(data == null){
                                                            console.log("nop")
                                                        }else{
                                                            embed.addFields(
                                                                {name: '-------------------------------------', value: '-------------------------------------', inline: false},
                                                                {name: "WARN", value: "-------", inline: false},
                                                                {name: `Raison : `, value: `${data.raison}`, inline: false},
                                                                {name: "Modérateur : ", value: `${data.moderateur}`, inline: false},
                                                                {name: "Date de sanction : ", value: `${data.date}`, inline: false}
                                                            )
                                                        }
                                                    })
                                                    message.channel.send(embed)
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
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
}

module.exports.help = {
    name: 'modlogs'
};1