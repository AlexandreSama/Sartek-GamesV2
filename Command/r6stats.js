const Discord = require('discord.js');
const request = require('request')

module.exports.run = async(client, message, args) => {

    message.delete()
    request(`http://185.216.25.216/getUser.php?name=${args[0]}&appcode=5873`, {json: true}, (err, results, body) => {
        if (err) { return console.log(err); }
        let responseID = Object.values(body['players']);
        request(`http://185.216.25.216/getStats.php?id=${responseID[0]['profile_id']}&appcode=5873`, {json: true},(err, results, body) => {
            if (err) { return console.log(err); }
            let responseStats = Object.values(body['players'])[0]
            console.log(responseStats)

            if(responseStats['rankedpvp_death'] === "undefined"){
                const exampleEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username)
                    .setTitle("Stats de : " + args[0])
                    .addFields({
                        name: "Morts en Match Casual", value: responseStats['casualpvp_death']
                    },
                    {
                        name: "Kills en Match Casual", value: responseStats['casualpvp_kills']
                    },
                    {
                        name: "Morts en Match Ranked", value: "N'a pas encore jouer en Ranked"
                    },
                    {
                        name: "Kills en Match Ranked", value: "N'a pas encore jouer en Ranked"
                    },
                    {
                        name: "Ratio en Ranked", value: "N'a pas encore jouer en Ranked"
                    })
                    message.channel.send(exampleEmbed);
            }else{
                const exampleEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username)
                    .setTitle("Stats de : " + args[0])
                    .addFields({
                        name: "Morts en Match Casual", value: responseStats['casualpvp_death']
                    },
                    {
                        name: "Kills en Match Casual", value: responseStats['casualpvp_kills']
                    },
                    {
                        name: "Morts en Match Ranked", value: responseStats['rankedpvp_death']
                    },
                    {
                        name: "Kills en Match Ranked", value: responseStats['rankedpvp_kills']
                    },
                    {
                        name: "Ratio en Ranked", value: responseStats['rankedpvp_kdratio']
                    })
                    message.channel.send(exampleEmbed);
            }
        })
    })
} 

module.exports.help = {
    name: 'r6stats'
};
