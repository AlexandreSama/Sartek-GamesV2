const Discord = require("discord.js");

module.exports.run = async (client, message, args, log) => {
  
  if(message.mentions.members.size == 1) {
            let member = message.mentions.members.first()
          const rando_imgs = [
            
            'https://media.giphy.com/media/l1J3G5lf06vi58EIE/giphy.gif',
            'https://media.giphy.com/media/xT0BKiwgIPGShJNi0g/giphy.gif',
            'https://media.giphy.com/media/3o6Zt2wf1yKWucbkqY/giphy.gif',
            'https://media.giphy.com/media/rcRwO8GMSfNV6/giphy.gif',
            'https://media.giphy.com/media/eiw5mph3qBvdiiHxMa/giphy.gif',
            'https://media.giphy.com/media/Z5zuypybI5dYc/giphy.gif',
            'https://media.giphy.com/media/GV53c1VNt0x4k/giphy.gif',
            'https://media.giphy.com/media/VM5TVKbYSExcQ/giphy.gif',
            'https://media.giphy.com/media/3M5J7yedLPCSs/giphy.gif',
            'https://media.giphy.com/media/xTiTnwsEIzfAUoD5FS/giphy.gif',
           
        ]

        let gif = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        let lien =  new Discord.MessageEmbed()
        .setColor('#6100FF')
        .setTitle(message.author.username + "   frappe   " + member.user.username)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
        .setImage(gif)
        .setTimestamp() 
        .setFooter(`Commande by Phénix Team's`)
        
        message.channel.send(lien)
        
        }

}
module.exports.help = {
  name:"punch"
}