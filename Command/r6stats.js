const Discord = require('discord.js');
const R6API = require('r6api.js');
const r6api = new R6API('nedep87776@donmah.com', 'alexandre');
const Canvas = require('canvas');

module.exports.run = async(client, message, args) => {

    message.delete()

	let saybot = args.join('_'); 

    const username = `${saybot}`,
        platform = 'uplay';

    const id = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);

    const rank = await r6api.getRank(platform, id, { regions: ['emea'] }).then(el => el[0]);

    console.log(rank)

    function minsToHHMMSS () {
        var mins_num = parseFloat(this, 10); // don"t forget the second param
        var hours   = Math.floor(mins_num / 60);
        var minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
        var seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));
        
        // Appends 0 when unit is less than 10
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+":"+minutes+":"+seconds;
    }

    let playTimePvEBefore = stats['pve']['general']['playtime'];
    let playTimePvEAfter = minsToHHMMSS(playTimePvEBefore);

    let playTimePvPBefore = stats['pve']['general']['playtime'];
    let playTimePvPAfter = minsToHHMMSS(playTimePvPBefore);

    let playTimeRankedBefore = stats['pve']['general']['playtime'];
    let playTimeRankedAfter = minsToHHMMSS(playTimeRankedBefore);

    const canvas = Canvas.createCanvas(564, 1002);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('./utils/img/rstats.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Infos reçu par l'API PvE
    ctx.font = '60px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Stats PvE", canvas.width / 3.5, canvas.height / 4.9);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Gagnées : ", canvas.width / 20, canvas.height / 3);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Perdus : ", canvas.width / 20, canvas.height / 2.4);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Kills : ", canvas.width / 20, canvas.height / 2);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Morts : ", canvas.width / 20, canvas.height / 1.7);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Headshots : ", canvas.width / 20, canvas.height / 1.5);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Suicide (noob) : ", canvas.width / 20, canvas.height / 1.34);

    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['wins']}`, canvas.width / 2, canvas.height / 3);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['losses']}`, canvas.width / 2, canvas.height / 2.4);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['kills']}`, canvas.width / 2, canvas.height / 2);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['deaths']}`, canvas.width / 2, canvas.height / 1.7);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['headshots']}`, canvas.width / 2, canvas.height / 1.5);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pve']['general']['suicides']}`, canvas.width / 2, canvas.height / 1.34);

	
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send("Stats R6 de : " + saybot)
	message.channel.send(attachment);

    // Since the image takes time to load, you should await it
	const background2 = await Canvas.loadImage('./utils/img/rstats.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);

    //Infos reçu par l'API PvE
    ctx.font = '60px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Stats PvP", canvas.width / 3.5, canvas.height / 4.9);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Gagnées : ", canvas.width / 20, canvas.height / 3);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Perdus : ", canvas.width / 20, canvas.height / 2.4);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Kills : ", canvas.width / 20, canvas.height / 2);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Morts : ", canvas.width / 20, canvas.height / 1.7);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Headshots : ", canvas.width / 20, canvas.height / 1.5);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Suicide (noob) : ", canvas.width / 20, canvas.height / 1.34);

    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['wins']}`, canvas.width / 2, canvas.height / 3);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['losses']}`, canvas.width / 2, canvas.height / 2.4);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['kills']}`, canvas.width / 2, canvas.height / 2);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['deaths']}`, canvas.width / 2, canvas.height / 1.7);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['headshots']}`, canvas.width / 2, canvas.height / 1.5);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${stats['pvp']['general']['suicides']}`, canvas.width / 2, canvas.height / 1.34);

	
	const attachment2 = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(attachment2);

    // Since the image takes time to load, you should await it
	const background3 = await Canvas.loadImage('./utils/img/rstats.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background3, 0, 0, canvas.width, canvas.height);

    //Infos reçu par l'API PvE
    ctx.font = '60px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Stats Ranked", canvas.width / 3.5, canvas.height / 4.9);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Gagnées : ", canvas.width / 20, canvas.height / 3);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Matchs Perdus : ", canvas.width / 20, canvas.height / 2.4);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Kills : ", canvas.width / 20, canvas.height / 2);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Morts : ", canvas.width / 20, canvas.height / 1.7);
    //
    ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("MMR : ", canvas.width / 20, canvas.height / 1.5);

    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${rank['seasons'][21]['regions']['emea']['wins']}`, canvas.width / 2, canvas.height / 3);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${rank['seasons'][21]['regions']['emea']['losses']}`, canvas.width / 2, canvas.height / 2.4);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${rank['seasons'][21]['regions']['emea']['kills']}`, canvas.width / 2, canvas.height / 2);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${rank['seasons'][21]['regions']['emea']['deaths']}`, canvas.width / 2, canvas.height / 1.7);
    //
    ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${rank['seasons'][21]['regions']['emea']['current']['mmr']}`, canvas.width / 2, canvas.height / 1.5);

	
	const attachment3 = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(attachment3);

    //     .addField("**Stats PvE**", `\nTemps de jeu : **${playTimePvEAfter}**\n


    //     .addField("**Stats Ranked**", `\nTemps de jeu : **${playTimeRankedAfter}**\n
    //     Match Gagnés : **${stats['pvp']['queue']['ranked']['wins']}**\n
    //     Match Perdus : **${stats['pvp']['queue']['ranked']['losses']}**\n
    //     Kills : **${stats['pvp']['queue']['ranked']['kills']}**\n
    //     Morts : **${stats['pvp']['queue']['ranked']['deaths']}**\n`, true)

        // message.channel.send(embed1)
} 

module.exports.help = {
    name: 'r6stats'
};
