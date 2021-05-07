const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    message.delete();

	let guildName = message.guild.name;
    let guildNameNoSpace = guildName.replace(/\s/g, '')

	var connection = mysql.createConnection({
		host     : config.bdhost,
        	user     : config.bdusername,
        	password : config.bdpassword,
        	port: 3306
    });


	if(message.member.hasPermission("BAN_MEMBERS")){
		connection.query(`USE ${guildNameNoSpace}`, function(error, results){
			if(error){
			   console.log(error)
			}
			if(results){
			   connection.query(`SELECT iddiscord FROM bans WHERE is_banned = '0'`, function(error, results){
			if(error){
			 console.log(error)
			}
			if(results){
			  console.log(results)
			}
			})
		  }
	   })
	}else{
		message.author.send("Tu n'a pas la permission de faire cet commande !")
	}

}


module.exports.help = {
    name: 'unbanflush'
};