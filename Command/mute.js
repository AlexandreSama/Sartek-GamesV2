const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');
const config = require('../config.json');
module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();
    let member = message.guild.members.resolve(dUser);
    let roleMap = message.guild.roles.cache.map(role => role.name);
    let dUserId = dUser.id;
    let dUserPseudo = dUser.username;
    let roleMuted = message.guild.roles.cache.find(role => role.name === "PatouuuMute");

    console.log(roleMap);

    let time = args[1]
    let times = time.slice(0, -1)
    let number = time.slice(-1);
    var nowDate = new Date();
    let date = moment(nowDate).format("YYYY-MM-DD HH:mm:ss");

    let reason = args[2];

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
        port: 3306
    });

    if(message.member.hasPermission("MUTE_MEMBERS")){
        if (reason.length < 1){
            return message.reply('Tu n\'a pas donné de raison !')
        }else{
            if(!roleMuted){
                message.channel.send('Le role "PatouuuMute" n\'existe pas !')
            }else{
                connection.query(`USE ${guildNameNoSpace}`, function(error, results){
                    if(error){
                        console.log(error)
                    }if(results){
                        connection.query(`INSERT INTO mutes (iddiscord, pseudo, raison, moderateur, temps, valeurtemps, date) VALUES ("${dUserId}", "${dUserPseudo}", "${reason}", "${message.author.username}", "${times}", "${number}", "${date}")`, function(error, results){
                            if(error){
                                console.log(error)
                            }if(results){
                                if(number === "m"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}mute ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} MINUTE DO UPDATE mute SET is_muted = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            member.roles.add(roleMuted);
                                            message.channel.send(`${dUser} a été mute pour **${reason}** pendant ${time}`);
                                            connection.destroy();
                                        }
                                    })
                                }else if(number === "d"){
                                    connection.query(`CREATE EVENT IF NOT EXISTS ${dUserId}mute ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${times} DAY DO UPDATE mute SET is_muted = '0' WHERE iddiscord = ${dUserId};`, function(error, results){
                                        if(error){
                                            console.log(error)
                                        }if (results) {
                                            member.roles.add(roleMuted);
                                            message.channel.send(`${dUser} a été mute pour **${reason}** pendant ${time}`);
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
    }else{
        
    }
}

module.exports.help = {
    name: 'mute'
};