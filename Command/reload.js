const Discord = require('discord.js');
const shell = require('shelljs')

module.exports.run = (client, message, args) => {

    message.delete()

	message.channel.send("Reboot du bot en cours....").then(res => {
        shell.exec('pm2 restart 1', {async:true});
    })
} 

module.exports.help = {
    name: 'reload'
};
