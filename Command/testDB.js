const mysql = require('mysql');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete()

    var connection = mysql.createConnection({
        host     : '185.216.25.216',
        user     : 'bojo',
        password : 'bojo',
        port: 3306
    });

        let guildName = message.guild.name;
        let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
        let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
        let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
        let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');
        connection.query(`USE ${guildNameNoSpace}`, function(error, results){
          if(error){
            console.log(error)
          }
          if(results){
            connection.query(`CREATE TABLE mutes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR(100) NOT NULL, date DATETIME NOT NULL, is_muted TINYINT NOT NULL DEFAULT 1);`, function(error, results){
                if(error){
                  console.log(error);
                  console.log(guildNameNoSpace)
                }
                if(results){
                  connection.query(`CREATE TABLE bans ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR(100) NOT NULL, date DATETIME NOT NULL, is_banned TINYINT NOT NULL DEFAULT 1 );`, function(error, results){
                    if(error){
                      console.log(error);
                    }
                    if(results){
                      connection.query(`CREATE TABLE kicks ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date DATETIME NOT NULL );`, function(error, results){
                        if(error){
                          console.log(error);
                        }
                        if(results){
                          connection.query(`CREATE TABLE warns ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date DATETIME NOT NULL );`, function(error, results){
                            if(error){
                              console.log(error);
                            }
                            if(results){
                              connection.query(`CREATE TABLE settings (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, idchannellogs BIGINT NOT NULL, idcategoryticket BIGINT NOT NULL, idchannelpresentation BIGINT NOT NULL);`, function(error, results){
                                if(error){
                                  console.log(error)
                                }
                                if(results){
                                  console.log("BDD + Tables construites avec succés");
                                  message.channel.send("Tables Crées")
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
        })
} 

module.exports.help = {
    name: 'testDB'
};
