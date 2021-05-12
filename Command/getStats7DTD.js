const Discord = require('discord.js');
const SdtdApi = require('7daystodie-api-wrapper');

module.exports.run = (client, message, args) => {

    message.delete()

	const sdtdServer = {
        ip: "193.168.146.71",
        port: "8082",
        adminUser: "alexandre",
        adminToken: "alexandre123Sa"
    }

    let stats = SdtdApi.getLog(sdtdServer);
    console.log(stats)
} 

module.exports.help = {
    name: 'stats7'
};
