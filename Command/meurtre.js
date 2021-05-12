const Discord = require("discord.js");

module.exports.run = async (client, message, args, log) => {
  
  if(message.mentions.members.size == 1) {
            let member = message.mentions.members.first()
          const rando_imgs = [
            
            'https://tenor.com/view/axe-axe-murderer-murder-gif-10632977',
            'https://tenor.com/view/yeen-crime-scene-pig-gif-17777958',
            'https://tenor.com/view/murder-andy-samberg-happy-dance-will-forte-gif-4728975',
            
        ]

        let gif = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        let lien =  new Discord.MessageEmbed()
        .setColor('#6100FF')
        .setTitle(message.author.username + "a tuer" + member.user.username)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
        .setImage(gif)
        .setTimestamp() 
        .setFooter(`Commande by Phénix Team's`)
        
        message.channel.send(lien)
        
        }

}
module.exports.help = {
  name:"meurtre"
}