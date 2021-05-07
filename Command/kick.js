const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    message.delete();
    
    let dUser = message.mentions.users.first();
    const member = message.guild.members.resolve(dUser);
    let dUserId = dUser.id;
    let dUserPseudo = dUser.username;

    var nowDate = new Date();
    let date = moment(nowDate).format("YYYY-MM-DD HH:mm:ss");

    let reason = args.join(" ")

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
                    connection.query(`INSERT INTO kicks (iddiscord, pseudo, raison, moderateur, date) VALUES ("${dUserId}", "${dUserPseudo}", "${reason}", "${message.author.username}", "${date}")`, function(error, results){
                        if(error){
                            console.log(error)
                        }if(results){
                            member.kick(reason)
                            message.channel.send(`${dUser} a été kick pour **${reason}**`);
                            connection.destroy();
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
    name: 'kick'
};