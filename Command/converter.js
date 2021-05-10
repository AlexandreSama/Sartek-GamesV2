const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    message.delete()

	args.forEach(function(arrayItem,arrayIndex,array){
        if(array[arrayIndex].match('m')){
            let minutes = ms(array[arrayIndex])
            message.channel.send("Votre temps : " + args[0] + "\nVotre temps en millisecondes : " + minutes)
        }
        if(array[arrayIndex].match('d')){
            let days = ms(array[arrayIndex])
            message.channel.send("Votre temps : " + args[0] + "\nVotre temps en millisecondes : " + days)
        }
        if(array[arrayIndex].match('s')){
            let seconds = ms(array[arrayIndex])
            message.channel.send("Votre temps : " + args[0] + "\nVotre temps en millisecondes : " + seconds)
        }
        if(array[arrayIndex].match('y')){
            let years = ms(array[arrayIndex])
            message.channel.send("Votre temps : " + args[0] + "\nVotre temps en millisecondes : " + years)
        }
        if(array[arrayIndex].match('h')){
            let hours = ms(array[arrayIndex])
            message.channel.send("Votre temps : " + args[0] + "\nVotre temps en millisecondes : " + hours)
        }
    })
} 

module.exports.help = {
    name: 'convert'
};