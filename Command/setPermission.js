const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    let guild = message.guild;
    let channelAndCategory = guild.channels.cache.array();
    let myRole = message.guild.roles.cache.find(role => role.name === "Mute_SartekGames");
    let roleId = myRole.id;

    if(message.member.hasPermission("BAN_MEMBERS")){
        channelAndCategory.forEach(element => {
            let permissionOverwrited = element['permissionOverwrites'];
              if(element['type'] == 'category'){
                  element.overwritePermissions([
                    {
                      id: roleId,
                      deny: ['SEND_MESSAGES'],
                    }
                ])
            }else if(element['type'] == 'text' | 'voice'){
                element.lockPermissions();
                message.channel.send("Permissions terminé !")
            }
        })
    }else{
        message.author.send("Tu n'a pas la permission de faire cet commande !")
    }
}

module.exports.help = {
    name: 'setpermission'
};