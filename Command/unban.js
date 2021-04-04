const Discord = require('discord.js');
const moment = require('moment');
const mysql = require('mysql');

module.exports.run = (client, message, args) => {

    message.delete();

	let guildName = message.guild.name;
    let guildNameNoSpace = guildName.replace(/\s/g, '')

	var connection = mysql.createConnection({
        	host     : '185.216.25.216',
        	user     : 'bojo',
        	password : 'bojo',
        	port: 3306
    });


    connection.query(`USE ${guildNameNoSpace}`, function(error, results){
     if(error){
    	console.log(error)
     }
     if(results){
    	connection.query(`SELECT iddiscord FROM ban WHERE is_banned = '0'`, function(error, results){
	 if(error){
	  console.log(error)
	 }
	 if(results){
	   console.log(results)
	 }
     })
   }
})

}


module.exports.help = {
    name: 'unbanflush'
};