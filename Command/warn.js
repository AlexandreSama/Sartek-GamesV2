const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();
    let dUserId = dUser.id;
    let dUserPseudo = dUser.username;
    let date = moment().format("YYYY:MM:DD HH:mm:ss")
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply('Quel est la raison???')
    dUser.send(`${dUser}, Tu a été warn pour ${dMessage} dans le serveur ${message.guild.name}`)
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
        charset: "utf8mb4_unicode_ci"
    });

    connection.connect();

    if(message.member.hasPermission("BAN_MEMBERS")){
        connection.query(`USE ${guildNameNoSpace}`, function(error, results){
            if(error){
                console.log(error)
            }
            if(results){
                connection.query(`INSERT INTO warns (iddiscord, pseudo, raison, moderateur, date) VALUES ("${dUserId}", "${dUserPseudo}", "${dMessage}", "${message.author.username}", "${date}")`, function(error, results){
                    if(error){
                        console.log(error)
                    }if(results){
                        message.channel.send(`${dUser} a été warn pour **${dMessage}**`)
                    }
                })
            }
        })
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
}

module.exports.help = {
    name: 'warn'
};