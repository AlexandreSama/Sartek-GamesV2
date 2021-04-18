const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();
    let member = message.guild.members.resolve(dUser);
    let dUserId = dUser.id;
    let dUserPseudo = dUser.username;

    let time = args[1]
    let times = time.slice(0, -1)
    let number = time.slice(-1);
    var nowDate = new Date();
    let date = moment(nowDate).format("YYYY-MM-DD HH:mm:ss");

    let reason = args.slice(2).join(" ");

    let guildName = message.guild.name;
    let guildNameNoSpace = guildName.replace(/\s/g, '')

    var connection = mysql.createConnection({
        host     : '185.216.25.216',
        user     : 'bojo',
        password : 'bojo',
        port: 3306
    });

    connection.connect();

    if (reason.length < 1){
        return message.reply('Tu n\'a pas donné de raison !')
    }else{
        connection.query(`USE ${guildNameNoSpace}`, function(error, results){
            if(error){
                console.log(error)
            }
            if(results){
                connection.query(`INSERT INTO bans (iddiscord, pseudo, raison, moderateur, temps, valeurtemps, date) VALUES ("${dUserId}", "${dUserPseudo}", "${reason}", "${message.author.username}", "${times}", "${number}", "${date}")`, function(error, results){
                    if(error){
                        console.log(error)
                    }if(results){
                        if(number === "m"){
                            connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}ban ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} MINUTE DO UPDATE ban SET is_banned = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
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
        })
    }
}

module.exports.help = {
    name: 'ban'
};