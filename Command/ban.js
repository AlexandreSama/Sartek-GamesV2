const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');

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
    let guildNameNoSpace = guildName.replace(/\s/g, '')

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
                    if(!dUser){
                        connection.query(`INSERT INTO bans (iddiscord, pseudo, raison, moderateur, temps, valeurtemps, date) VALUES ("${args[0]}", "${args[0]}", "${reason}", "${message.author.username}", "${times}", "${number}", "${date}")`, function(error, results){
                            if(error){
                                console.log(error)
                            }if(results){
                                if(number === "m"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${args[0]}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} MINUTE DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${args[0]};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            message.guild.members.ban(args[0], {
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
                                            message.guild.members.ban(args[0], {
                                                reason: `${reason}`
                                            })
                                            message.channel.send(`${args[0]} a été ban pour **${reason}** pendant ${time}`);
                                            connection.destroy();
                                        }
                                    })
                                }
                            }
                        })
                    }else{
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
                                            
                                        }
                                    })
                                }else if(number === "d"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} DAY DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
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