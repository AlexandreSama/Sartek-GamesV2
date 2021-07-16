const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();

    let time = args[1]
    let times = time.slice(0, -1)
    let number = time.slice(-1);
    var nowDate = new Date();
    let date = moment(nowDate).format("YYYY-MM-DD HH:mm:ss");

    let reason = args.join(" ").slice(22);

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
        supportBigNumbers: true,
        bigNumberStrings: true
    });

    connection.connect();

    if(message.member.hasPermission("BAN_MEMBERS")){
        if (reason.length < 1){
            return message.reply('Tu n\'a pas donné de raison !')
        }else{
            connection.query(`USE ${guildNameNoSpace}`, function(error, results){
                if(error){
                    console.log(error)
                }
                if(results){
                    if(dUser){
                        console.log("Ping")
                        let dUserId = dUser.id;
                        let dUserPseudo = dUser.username;
                        connection.query(`INSERT INTO bans (iddiscord, pseudo, raison, moderateur, temps, valeurtemps, date) VALUES ("${dUserId}", "${dUserPseudo}", "${reason}", "${message.author.username}", "${times}", "${number}", "${date}")`, function(error, results){
                            if(error){
                                console.log(error)
                            }if(results){
                                if(number === "m"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} MINUTE DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            let member = message.guild.members.cache.get(dUser.id);
                                            member.ban({
                                                reason: `${reason}`
                                            }) 
                                        }
                                    })
                                }else if(number === "d"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} DAY DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            let member = message.guild.members.cache.get(dUser.id);
                                            member.ban({
                                                reason: `${reason}`
                                            })
                                            message.channel.send(`${dUser} a été ban pour **${reason}** pendant ${time}`);
                                            connection.destroy();
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        console.log("Pas Ping")
                        console.log(args[0])
                        connection.query(`INSERT INTO bans (iddiscord, pseudo, raison, moderateur, temps, valeurtemps, date) VALUES ("${args[0]}", "${args[0]}", "${reason}", "${message.author.username}", "${times}", "${number}", "${date}")`, function(error, results){
                            if(error){
                                console.log(error)
                            }if(results){
                                if(number === "m"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${args[0]}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} MINUTE DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${args[0]};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            let member = message.guild.members.cache.get(args[0]);
                                            console.log(member)
                                            member.ban({
                                                reason: `${reason}`
                                            })
                                            message.channel.send(`${args[0]} a été ban pour **${reason}** pendant ${time}`);
                                            connection.destroy();
                                        }
                                    })
                                }else if(number === "d"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${args[0]}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} DAY DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${args[0]};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            let member = message.guild.members.cache.get(args[0]);
                                            console.log(member)
                                            member.ban({
                                                reason: `${reason}`
                                            })
                                            message.channel.send(`${args[0]} a été ban pour **${reason}** pendant ${time}`);
                                            connection.destroy();
                                        }
                                    })
                                }
                            }
                        })
                    }                    
                }
            })
        }
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
}

module.exports.help = {
    name: 'ban'
};