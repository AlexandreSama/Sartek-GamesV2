const Discord = require('discord.js');
const shell = require('shelljs')

module.exports.run = (client, message, args) => {

    message.delete()

	message.channel.send("Reboot du bot en cours....").then(res => {
        var child = shell.exec('pm2 stop 1', {async:true});
        child.stdout.on('data', function(data) {
            shell.exec("pm2 start 1")
        });
    })
} 

module.exports.help = {
    name: 'reload'
};
