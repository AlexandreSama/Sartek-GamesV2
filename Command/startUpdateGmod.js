const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports.run = (client, message, args) => {

    message.delete()
    message.channel.send("Préparation en cours...")

    function gmodUpdate() {
        Gamedig.query({
            type: 'garrysmod',
            host: '149.91.89.181'
        }).then((state) => {
            console.log(state);
            const exampleEmbed = new Discord.MessageEmbed()
            .setAuthor("PhénixRP")
            .setDescription("Status du serveur GMOD")
            .addFields({
                name: 'Activité du serveur',
                value: 'Allumé !'
            },
            {
                name: 'Nom du serveur',
                value: state['name']
            },
            {
                name: 'Nombre de joueurs',
                value: state['players'].length
            },
            {
                name: 'Ping du serveur',
                value: state['ping']
            })
            message.channel.lastMessage.edit(exampleEmbed)
            console.log("Edité !")
        })
    }

    setInterval(() => gmodUpdate(), 10000)

} 

module.exports.help = {
    name: 'sug'
};
