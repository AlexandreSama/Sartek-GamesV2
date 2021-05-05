const Discord = require('discord.js');
const R6API = require('r6api.js');
const request = require('request')
const Canvas = require('canvas');

module.exports.run = async(client, message, args) => {

    const canvas = Canvas.createCanvas(564, 1002);
    const ctx = canvas.getContext('2d');

    const background2 = await Canvas.loadImage('./utils/img/rstats.jpg');
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);
    message.delete()
    request(`http://185.216.25.216/getUser.php?name=${args[0]}&appcode=5873`, {json: true}, (err, results, body) => {
        if (err) { return console.log(err); }
        let responseID = Object.values(body['players']);
        request(`http://185.216.25.216/getStats.php?id=${responseID[0]['profile_id']}&appcode=5873`, {json: true},(err, results, body) => {
            if (err) { return console.log(err); }
            let responseStats = Object.values(body['players'])[0]

            //Infos reçu par l'API PvE
            ctx.font = '60px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Stats R6", canvas.width / 3.5, canvas.height / 4.9);
            //
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Morts Match Casual : ", canvas.width / 20, canvas.height / 3);
            //
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Kills Match Casual : ", canvas.width / 20, canvas.height / 2.4);
            //
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Mort Match Ranked", canvas.width / 20, canvas.height / 2);
            //
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Kills Match Ranked : ", canvas.width / 20, canvas.height / 1.7);
            //
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Ratio Ranked : ", canvas.width / 20, canvas.height / 1.5);

            ctx.font = '40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${responseStats['casualpvp_death']}`, canvas.width / 2, canvas.height / 3);
            //
            ctx.font = '40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${responseStats['casualpvp_kills']}`, canvas.width / 2, canvas.height / 2.4);
            //
            ctx.font = '40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${responseStats['rankedpvp_death']}`, canvas.width / 2, canvas.height / 2);
            //
            ctx.font = '40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${responseStats['rankedpvp_kills']}`, canvas.width / 2, canvas.height / 1.7);
            //
            ctx.font = '40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${responseStats['rankedpvp_kdratio']}`, canvas.width / 2, canvas.height / 1.5);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

            message.channel.send(attachment);
        })
    })
} 

module.exports.help = {
    name: 'r6stats'
};
