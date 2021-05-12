const Discord = require('discord.js');
const SdtdApi = require('7daystodie-api-wrapper');

module.exports.run = (client, message, args) => {

    message.delete()

	const sdtdServer = {
        ip: "192.168.1.100",
        port: "8082",
        adminUser: "admin",
        adminToken: "secret"
    }

    let stats = SdtdApi.getStats(sdtdServer);
    console.log(stats)
} 

module.exports.help = {
    name: 'stats7'
};
