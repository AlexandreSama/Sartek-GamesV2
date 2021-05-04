const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();
    let dUserId = dUser.id;
    let dUserPseudo = dUser.username;
    let date = moment().format("YYYY-MM-DD HH:MM:SS");
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply('Quel est la raison???')
    dUser.send(`${dUser}, Tu a été warn pour ${dMessage} dans le serveur ${message.guild.name}`)
    let guildName = message.guild.name;
    let guildNameNoSpace = guildName.replace(/\s/g, '')

    var connection = mysql.createConnection({
        host     : '185.216.25.216',
        user     : 'bojo',
        password : 'bojo',
        port: 3306
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