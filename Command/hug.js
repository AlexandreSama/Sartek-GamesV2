const Discord = require("discord.js");

module.exports.run = async (client, message, args, log) => {
  
  if(message.mentions.members.size == 1) {
            let member = message.mentions.members.first()
          const rando_imgs = [
            
            'https://media.giphy.com/media/gHKnFHkGPUmG4GTzUt/giphy.gif',
            'https://media.giphy.com/media/KG5oq4vesf9r8JbBEN/giphy.gif',
            'https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif',
            'https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif',
            'https://media.giphy.com/media/VduFvPwm3gfGO8duNN/giphy.gif',
            'https://media.giphy.com/media/4No2q4ROPXO7T6NWhS/giphy.gif',
            'https://media.giphy.com/media/fyx8vjZc2ZvoY/giphy.gif',
            'https://media.giphy.com/media/W4NKtcOqK2kYo/giphy.gif',
            'https://media.giphy.com/media/7eQ8Ky3dAsRYA/giphy.gif',
            'https://media.giphy.com/media/VGACXbkf0AeGs/giphy.gif',
            'https://media.giphy.com/media/3orif2vpZbXi8P0fPW/giphy.gif',
            
        ]

        let gif = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        let lien =  new Discord.MessageEmbed()
        .setColor('#6100FF')
        .setTitle(message.author.username + "   fait un câlin à   " + member.user.username)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic : true}))
        .setImage(gif)
        .setTimestamp() 
        .setFooter(`Commande by Phénix Team's`)
        
        message.channel.send(lien)
        
        }

}
module.exports.help = {
  name:"hug"
}