const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = (client, message) => {

    message.delete();

    let authorid = message.author.id;
    const filter = message => message.author.id == authorid;
    let guildName = message.guild.name;
    let guildNameNoEmoji = guildName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    let guildNameNoChar1 = guildNameNoEmoji.replace("'", "");
    let guildNameNoChar2 = guildNameNoChar1.replace("-", "");
    let guildNameNoChar3 = guildNameNoChar2.replace(/([-]|[']|[>]|[<]|[/]|[|][!]|[?]|[你好]|[!]|[|])/g, '');
    let guildNameNoSpace = guildNameNoChar3.replace(/\s/g, '');

    message.author.send("").then(res1 => {
        res1.channel.awaitMessages(filter, {max: 1}).then(collector1 => {
            let pseudo = collector1.first().content;
        })
    })
}

module.exports.help = {
    name: 'presentation'
};