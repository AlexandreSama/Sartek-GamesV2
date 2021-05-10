const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    message.delete()
     
      let phrase = args.join(' ')

      let embed = new Discord.MessageEmbed()
      .setColor('FF009B')
      .setAuthor("Nouvelle suggestion de "+message.author.username, message.author.displayAvatarURL({dynamic : true}))
      .addField("Une nouvelle idée vient d'arriver!",phrase)
      .setTimestamp()
      .setFooter(`Commande by Phénix Team's`)
      message.channel.send(embed).then(embedmessage => {
          embedmessage.react("✅")
          embedmessage.react("❌")
      })

    }
  

  module.exports.help = {
    name: 'suggestion'
};