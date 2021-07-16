const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = "+";
const fs = require('fs');
const db = require('quick.db');
const canvas = require("discord-canvas"),
goodbyeCanvas = new canvas.Goodbye(),
welcomeCanvas = new canvas.Welcome();
const mysql = require('mysql');
const config = require('./config.json');

// Système de give

var connection = mysql.createConnection({
        host     : config.bdhost,
        user     : config.bdusername,
        password : config.bdpassword,
        port: 3306,
        supportBigNumbers: true,
        bigNumberStrings: true,
        charset: "utf8mb4_unicode_ci"
});

// Extends the GiveawaysManager class and update the refreshStorage method
const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
    // Refresh storage method is called when the database is updated on one of the shards
    async refreshStorage() {
        // This should make all shard refreshing their cache with the updated database
        return client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithShardSupport(client, {
  storage: './storage.json',
  updateCountdownEvery: 10000,
  default: {
      botsCanWin: false,
      exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
      embedColor: '#FF0000',
      embedColorEnd: '#000000',
      reaction: '🎉'
  }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

// status du bot

client.on('ready', async message => {
  console.log(`Logged in as ${client.user.tag}!`);
  let nameActivitys = ['discord.gg/phenixmg', 'Chaine YTB de mon Créateur : PatouTv•', '+help pour mes commandes']
  let random = nameActivitys[Math.floor((Math.random()*nameActivitys.length))]
  client.user.setActivity({name: random, type: "PLAYING"})

  console.log("prêt !")
})

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

  let guildName = member.guild.name;
  let guildCount = member.guild.memberCount;
  let memberAvatar = member.user.displayAvatarURL({dynamic : true, format: 'jpg'});

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
  member.guild.systemChannel.send(attachment);

});

// Envoi un message d'adieu dans un channel spécifique 
client.on('guildMemberRemove', async member => {

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
  member.guild.systemChannel.send(attachment);
});

client.on('guildCreate', (guild) => {

  guild.owner.send("Bonjour, merci de m'avoir ajouté sur votre serveur ! Avant de pouvoir pleinement m'utiliser, voici quelques étapes : \n - Veuillez crée une catégorie 'tickets' afin que vos utilisateurs puissent créer des tickets  \n - Veuillez crée un channel pour les logs du bot \n -Veuillez crée un channel pour les présentations \n -Pour finir, veuillez faire la commande : +settings afin de me paramètrer \n -Pour tout support merci de rejoindre ce discord : discord.gg/BpPWaQq")
});

client.on('guildDelete', (guild) => {
  guild.owner.send("J'espère avoir été utile a vos côtés, bonne continuation et bonne chance a vous !");

  let guildName = guild.name;
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

  connection.query(`DROP DATABASE ${guildNameNoSpace}`, function(error, results){
    if(error){
      console.log(error)
    }
    if(results){
      console.log("Base de donnée du serveur " + guildNameNoSpace + " supprimée avec succés")
    }
  })

});

client.on('messageDelete', async message => {

  let guildName = message.guild.name;
  let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
  let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
  let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
  let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
  let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');

  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE"
  })

  const deletionLog = fetchedLogs.entries.first()

  if(!deletionLog) return console.log(`Un message de ${message.author.username} a été supprimé mais aucun log n'a été trouvé `)

  const { executor, target } = deletionLog;

  if(target.id === message.author.id){

    connection.query(`USE ${guildNameNoSpace}`, function(error, results){
      if(error){
        console.log(error)
      }else{
        connection.query(`SELECT idchannellogs FROM settings`, function(error, results){
          if(error){
            console.log(error)
          }else{
            var kickData = JSON.stringify(results)
            var kickFinalData = JSON.parse(kickData)
            let channel = message.guild.channels.cache.get(kickFinalData[0]['idchannellogs'])
            let deleted =  new Discord.MessageEmbed()
            .setColor('#6100FF')
            .setTitle(`Le message a été envoyer par  **___${message.author.id}___**  , et supprimer dans le channel **___${message.channel.name}___**`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
            .setDescription('message supprimées', message.content)
            .setTimestamp() 
            .setFooter(`Commande by Phénix Team's`)
            channel.send(deleted)
          }
        })
      }
    })

  }else{

    connection.query(`USE ${guildNameNoSpace}`, function(error, results){
      if(error){
        console.log(error)
      }else{
        connection.query(`SELECT idchannellogs FROM settings`, function(error, results){
          if(error){
            console.log(error)
          }else{
            var kickData = JSON.stringify(results)
            var kickFinalData = JSON.parse(kickData)
            let channel = message.guild.channels.cache.get(kickFinalData[0]['idchannellogs'])
            let deleted =  new Discord.MessageEmbed()
            .setColor('#FF0017')
            .setTitle(`Le message a été envoyer par  **___${message.author.username}___**  , et supprimer dans le channel **___${message.channel.name}___**`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
            .addField('message supprimées', message.content)
            
            .setTimestamp() 
            .setFooter(`Commande by Phénix Team's`)
            channel.send(deleted)
            console.log(`<#${message.channel.id}>`)
          }
        })
      }
    })

  }
});

client.on('messageUpdate', (oldMessage, newMessage) =>{
  let guildName = oldMessage.guild.name;
  let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
  let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
  let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
  let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
  let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');

  connection.query(`USE ${guildNameNoSpace}`, function(error, results){
    if(error){
      console.log(error)
    }else{
      connection.query(`SELECT idchannellogs FROM settings`, function(error, results){
        if(error){
          console.log(error)
        }else{
          var kickData = JSON.stringify(results)
          var kickFinalData = JSON.parse(kickData)
          let channel = oldMessage.guild.channels.cache.get(kickFinalData[0]['idchannellogs'])
          let deleted =  new Discord.MessageEmbed()
            .setColor('#FBFF00')
            .setTitle(`Un message de  **___${oldMessage.author.username}___**  a été modifié !`)
            .setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL({dynamic : true}))
            .addField("**Message avant :**", oldMessage.content, true)
            .addField("**Message après :**", newMessage.content, true)
            .setTimestamp() 
            .setFooter(`Commande by Phénix Team's`)
            channel.send(deleted)
        }
      })
    }
  })
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let guildName = oldMember.guild.name;
  let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
  let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
  let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
  let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
  let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');
  
  connection.query(`USE ${guildNameNoSpace}`, function(error, results){
    if(error){
      console.log(error)
    }else{
      connection.query(`SELECT idchannellogs FROM settings`, function(error, results){
        if(error){
          console.log(error)
        }else{
          var kickData = JSON.stringify(results)
          var kickFinalData = JSON.parse(kickData)
          let channel = oldMember.guild.channels.cache.get(kickFinalData[0]['idchannellogs'])
          let deleted =  new Discord.MessageEmbed()
          // if(oldMember.channelID === newMember.channelID) {
          //   console.log('a user has not moved!')
          // }
          if(oldMember.channelID != null && newMember.channelID != null && newMember.channelID != oldMember.channelID) {
            console.log(oldMember.channelID + newMember.channelID)
            let oldChannelVoice = oldMember.guild.channels.cache.get(oldMember.channel.id)
            let newChannelVoice = oldMember.guild.channels.cache.get(newMember.channel.id)
            console.log("switch")
            deleted.setColor("#00FFF0")
              .setTitle(`**___${oldMember.member.user.username}___**  s'est déplacé du channel  **___${oldChannelVoice.name}___**  pour aller dans le channel  **___${newChannelVoice.name}___**`)
              .setAuthor(oldMember.member.user.username, oldMember.member.user.displayAvatarURL({dynamic : true}))
              .setTimestamp() 
              .setFooter(`Commande by Phénix Team's`)

            channel.send(deleted)
          }
          if(oldMember.channelID === null) {
            let channelVoice = oldMember.guild.channels.cache.get(newMember.channel.id)
            console.log("join")
              deleted.setColor("#00FF1B")
              .setTitle(`**___${oldMember.member.user.username}___**  a rejoins le channel **___${channelVoice.name}___**`)
              .setAuthor(oldMember.member.user.username, newMember.member.user.displayAvatarURL({dynamic : true}))
              .setTimestamp() 
              .setFooter(`Commande by Phénix Team's`)

              channel.send(deleted)
          }
          if (newMember.channelID === null) {
            let channelVoice = oldMember.guild.channels.cache.get(oldMember.channel.id)
            console.log("leave")
              deleted.setColor("#FF0027")
                .setTitle(`**___${oldMember.member.user.username}___**  a quitté le channel **___${channelVoice.name}___**`)
                .setAuthor(newMember.member.user.username, newMember.member.user.displayAvatarURL({dynamic : true}))
                .setTimestamp() 
                .setFooter(`Commande by Phénix Team's`)

              channel.send(deleted)
          }
        }
      })
    }
  })
});

client.login(config.token);