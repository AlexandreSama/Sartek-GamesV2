const Discord = require('discord.js');
const shell = require('shelljs')

module.exports.run = (client, message, args) => {

    message.delete()

	message.channel.send("Reboot du bot en cours....").then(res => {
        shell.exec("pm2 stop 1", {async: true}, function(code, stdout, stderr){
            shell.exec("pm2 start 1")
        })
    })
} 

module.exports.help = {
    name: 'reload'
};
