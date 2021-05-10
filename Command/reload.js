const Discord = require('discord.js');
const shell = require('shelljs')

module.exports.run = (client, message, args) => {

    message.delete()

    if(message.author.id === "724693796499095552" || message.author.id === "256892994504884224"){
	    message.channel.send("Reboot du bot en cours....").then(res => {
            shell.exec('pm2 restart 1', {async:true});
        })
    }
} 

module.exports.help = {
    name: 'reload'
};
