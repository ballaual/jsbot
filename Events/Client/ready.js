const { Client } = require('discord.js');


module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag} on ${client.guilds.cache.size} server.`);  
        client.user.setActivity("mit VS CODE", {type: "PLAYING"});
    }
}