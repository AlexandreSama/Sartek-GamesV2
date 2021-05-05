const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();


    let guildName = message.guild.name;
    let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
    let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
    let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
    let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');
    //On récupère les infos de l'utilisateur
    let user = message.author;
    //On indique que channelName veut dire 'ticket-de-' + le pseudo de l'utilisateur en minuscule !
    var channelName = `ticket-de-` + user.username.toLowerCase();
    //On indique que le nom de la catégorie pour les tickets est "tickets"
    var connection = mysql.createConnection({
      host     : '185.216.25.216',
      user     : 'bojo',
      password : 'bojo',
      port: 3306,
      supportBigNumbers: true,
      bigNumberStrings: true
    });
    connection.query(`USE ${guildNameNoSpace}`, function(error, results){
      if(error){
        message.channel.send("Avez-vous fait vos permissions ? Si oui, contacter un des créateurs du bot")
      }
      if(results){
        connection.query('SELECT idcategoryticket FROM settings', function(error, results){
          if(error){
            console.log(error)
          }
          if(results){
            let category = results;
            let categoryData = JSON.stringify(category)
            let categoryDataFinal = JSON.parse(categoryData);
            //On cherche s'il existe déjà un ticket pour cet personne
            let channel = message.guild.channels.cache.find(channel => channel.name === channelName)
            let myRole = message.guild.roles.cache.find(r => r.name === "gestionticket")
            console.log(categoryDataFinal[0]['idcategoryticket'])

            //Si il n'y a pas de ticket pour cet utilisateur
            if(channel === undefined){
                // on crée un channel a son nom
                message.guild.channels.create(channelName, {
                    type: 'text',
                    parent: categoryDataFinal[0]['idcategoryticket'],
                    permissionOverwrites: [
                        {
                          id: message.guild.id, // shortcut for @everyone role ID
                          deny: 'VIEW_CHANNEL'
                        },
                        {
                          id: user.id,
                          allow: 'VIEW_CHANNEL'
                        },
                        {
                          id: myRole.id,
                          allow: 'VIEW_CHANNEL'
                        }
                      ]
                }).then(() => {
                    //Puis on revérifie si le channel existe
                    let channel = message.guild.channels.cache.find(channel => channel.name === channelName)
                    //Et on envoie un message 
                    channel.send("Bienvenue <@" + user.id + ">" + ", tu peut désormais poser tes questions ici et l'on te répondra sous peu !");
                })
                //Si le channel existe déjà
            }else {
                //On le préviens
                message.channel.send("Tu a déjà un ticket ouvert !")
            }
          }
        })
      }
    })
}

module.exports.help = {
    name: 'createticket'
};