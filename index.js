const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = "+";
const fs = require('fs');
const db = require('quick.db');
const canvas = require("discord-canvas"),
goodbyeCanvas = new canvas.Goodbye(),
welcomeCanvas = new canvas.Welcome();
const { ReactionRole } = require("reaction-role");
const mysql = require('mysql');
// const io = require('@pm2/io')

client.on('ready', (message) => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guild = client.guilds.cache.get("706614492041183284");
  let roleMuted = guild.roles.cache.find(role => role.name === "Mute_SartekGames");

  const reactionRoles = new ReactionRole("Nzk5MzY5MDQ2NDg2Mjg2MzY2.YACkcA.lBAdfpEvIvgMwg4n4yapTC4L4cg");

  let guildName = guild.name;
  let guildNameNoSpace = guildName.replace(/\s/g, '');

    const option1 = reactionRoles.createOption(
        "✅", // L'emoji utilisé pour la réaction
        `Le rôle ${roleMuted.name} t'a été donné !`, // Message quand l'user clique sur la réac
        `Le Rôle ${roleMuted.name} t'a été enlevé`,  // Message quand l'user retire son clic sur la réac
        ["770760633989464105"], // L'id du rôle a donner
    );

    const option2 = reactionRoles.createOption(
      "😉",
      `Le rôle ${roleMuted.name} t'a été donné !`,
      `Le Rôle ${roleMuted.name} t'a été enlevé`,
      ["785939461804392488"],
    );

    const option3 = reactionRoles.createOption(
      "😫",
      `Le rôle ${roleMuted.name} t'a été donné !`,
      `Le Rôle ${roleMuted.name} t'a été enlevé`,
      ["783756464493166662"],
    );

    const LIMIT = 3; // La limite de rôle que l'utilisateur peut avoir
    const RESTRICTIONS = []; // Restrictions, je l'ai ajouté au cas ou si tu veut fixer des règles en fonction des perms

    reactionRoles.createMessage( //Tu crée le message
        "802955999932841987",
        "716370127498641418",
        LIMIT,
        RESTRICTIONS,
        option1,
        option2,
        option3
    );

    reactionRoles.init(); // Et tu l'initialise

var connection = mysql.createConnection({
    host     : '185.216.25.216',
    user     : 'bojo',
    password : 'bojo',
    port: 3306
  });

//L'intervale pour la vérification des ban

setInterval(function(){
      connection.query(`USE ${guildNameNoSpace}`,function(error, results){
      	if(error){
      	   console.log(error)
      	}
      	if(results){
      connection.query(`SELECT iddiscord FROM ban WHERE is_banned = '0'`, function(error, results){
        if(error){
          console.log(error)
        }
        if(results){
          var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
          var finalData = JSON.parse(data)
          finalData.forEach(function(data, index) {
              guild.fetchBans().then(bans => {
              if(bans.size == 0)return
              let bUser = bans.find(b => b.user.id == data.iddiscord)
              if(!bUser) return
              guild.members.unban(bUser.user)
              console.log("et une personne d'unban !")
            })
          })
        }})}})
    }, 1800000);

//L'interval pour la vérification des mutes

setInterval(function(){
      connection.query(`USE ${guildNameNoSpace}`,function(error, results){
      	if(error){
      	   console.log(error)
      	}
      	if(results){
      connection.query(`SELECT iddiscord FROM mute WHERE is_muted = '0'`, function(error, results){
        if(error){
          console.log(error)
        }
        if(results){
          var data = JSON.stringify(results)
            //On rend sous forme de JSON la var data
          var finalData = JSON.parse(data)
          finalData.forEach(function(data, index) {
              let member = guild.member(data.iddiscord)
              member.roles.remove(roleMuted)
              console.log("et une personne d'unmute !")
          })
        }})}})
    }, 1800000);

    if(!roleMuted){
      guild.roles.create({
        data : {
          name: "Mute_SartekGames",
          color: 'YELLOW',
          permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          mentionable : false,
          position: Number('14')
        },
        reason: 'Role spécifique pour le mute de Sartek-Games' 
      })
    }
});

//Base du Command Handler
fs.readdir('./Command/', (error, f) => {
  if (error) {
    return console.error(error);
  }
  const commandes = f.filter((f) => f.split('.').pop() === 'js');
  if (commandes.length <= 0) {
    return console.log('Aucune commande trouvée !');
  }

  commandes.forEach((f) => {
    const commande = require(`./Command/${f}`);
    console.log(`commande ${f} chargée !`);
    client.commands.set(commande.help.name, commande);
  });
});

fs.readdir('./Events/', (error, f) => {
  if (error) {
    return console.error(error);
  }
  console.log(`${f.length} events chargés`);

  f.forEach((f) => {
    const events = require(`./Events/${f}`);
    const event = f.split('.')[0];
    client.on(event, events.bind(null, client, fs));
  });
});

function xp(message) {
  const randomNumber = Math.floor(Math.random() * 10) + 15;
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber);
  db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber);
  const level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
  const xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
  const xpNeeded = level * 500;
  if (xpNeeded < xp) {
    const newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 2);
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
    message.channel.send(`${message.author}, tu est monté au niveau ${newLevel}`);
  }
}

// Contient le Command Handler et la fonction XP
client.on('message', async (message) => {

  const messageArray = message.content.split(/\s+/g);
  const command = messageArray[0];
  const args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  const cmd = client.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(client, message, args);
  if (message.author.bot) {
    return;
  }
  xp(message);
});

// Envoi un message de bienvenu dans un channel spécifique 
client.on('guildMemberAdd', async (member) => {

  let channelName = 'welcome';
  const channel = member.guild.channels.cache.find(channel => channel.name === channelName);
  let guildName = member.guild.name;
  let guildCount = member.guild.memberCount;
  let memberAvatar = member.user.displayAvatarURL({dynamic : true});

  let image = await welcomeCanvas
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(guildCount)
  .setGuildName(guildName)
  .setAvatar(memberAvatar)
  .setText("title", "Bienvenue")
  .setText("message", "Bienvenue sur le serveur {server}")
  .setText("member-count", "- {count}ème membres")
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .toAttachment();

  let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
  channel.send(attachment);

});

// Envoi un message d'adieu dans un channel spécifique 
client.on('guildMemberRemove', async member => {

  let myChannel = 'goodbye';
  const channel = member.guild.channels.cache.find(channel => channel.name === myChannel);
  let guildName = member.guild.name;
  let guildCount = member.guild.memberCount;

  let image = await goodbyeCanvas
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(guildCount)
  .setGuildName(guildName)
  .setText("title", "Adieu")
  .setText("message", "s'en va du serveur {server}")
  .setText("member-count", "- nous ne sommes plus que {count} membres")
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .toAttachment();

  let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
  channel.send(attachment);
})

client.on('guildCreate', (guild) => {
  let guildName = guild.name;;
  let guildNameNoSpace = guildName.replace(/\s/g, '');

  var connection = mysql.createConnection({
    host     : '185.216.25.216',
    user     : 'bojo',
    password : 'bojo',
    port: 3306
  });
   
  connection.connect();

  connection.query(`CREATE DATABASE ${guildNameNoSpace};`, function (error, results){
    if(error){
      console.log(error);
    }
    if (results) {
      connection.query(`USE ${guildNameNoSpace}`, function (error, results){
        if(error){
          console.log(error);
        }
        if(results){
          connection.query(`CREATE TABLE mute (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord INT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR NOT NULL, date DATETIME NOT NULL, is_muted TINYINT NOT NULL DEFAULT 1);`, function(error, results){
            if(error){
              console.log(error);
            }
            if(results){
              connection.query(`CREATE TABLE ban ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord BIGINT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, temps TINYINT NOT NULL, valeurtemps VARCHAR NOT NULL, date DATETIME NOT NULL, is_banned TINYINT NOT NULL DEFAULT 1 );`, function(error, results){
                if(error){
                  console.log(error);
                }
                if(results){
                  connection.query(`CREATE TABLE kick ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord INT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date DATETIME NOT NULL );`, function(error, results){
                    if(error){
                      console.log(error);
                    }
                    if(results){
                      connection.query(`CREATE TABLE warn ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, iddiscord INT NOT NULL, pseudo TEXT NOT NULL, raison TEXT NOT NULL, moderateur TEXT NOT NULL, date DATETIME NOT NULL );`, function(error, results){
                        if(error){
                          console.log(error);
                        }
                        if(results){
                          console.log("BDD + Tables construites avec succés");
                          connection.destroy();
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
})

client.login('Nzk5MzY5MDQ2NDg2Mjg2MzY2.YACkcA.lBAdfpEvIvgMwg4n4yapTC4L4cg');