const Discord = require('discord.js');
const snekfetch = require('snekfetch')
const moment = require('moment')
module.exports.run = (client, message, args) => {

    message.delete()

    let saybot = args.join('_'); 
    const url = `https://api.roblox.com/users/get-by-username?username=${saybot}`; 
      snekfetch.get(url).then(result => { 
       const data = result.body.Id; 
        if (saybot.length < 1) return message.channel.send("Tu a besoin de me donner un pseudo pour cet commande") 
        if (result.body.Id === "undefined") return message.channel.send("Impossible de trouver le compte a qui appartient ce pseudo " + saybot) 
        const url2 = `https://api.roblox.com/ownership/hasasset?userId=${data}&assetId=102611803`; 
        snekfetch.get(url2).then(a => { 
        const Verifiedcheck = a.body 
          const embed = new Discord.MessageEmbed() 
          .setColor(0x00A2E8) 
          .setTitle("Pseudonyme: " + saybot) 
          .setDescription("User ID: " + data) 
          .addField("Compte Vérifié ?", Verifiedcheck) 
          .setFooter("Lien vers le profile : " + `https://web.roblox.com/users/${data}/profile`) 
          .setThumbnail("https://roblox.com/Thumbs/BCOverlay.ashx?username=" + saybot) 
          .setImage("http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + saybot); 
          const url3 = `https://users.roblox.com/v1/users/${data}`
          snekfetch.get(url3).then(b => {
            let result = b.body
            let date = moment(result.created).format("YYYY-MM-DD HH:mm:ss");
            embed.addField("Date de création du compte", date, true)
            message.channel.send(embed).catch(console.error)
          })
        })
      })  
}

module.exports.help = {
    name: 'roblox'
};

