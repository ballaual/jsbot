const { Client, Collection } = require("discord.js");
//Intent Calculator - https://ziad87.net/intents/
const client = new Client({intents: [131071]});
const { Token } = require("./config.json");

client.commands = new Collection();
client.voiceGenerator = new Collection();

const { DisTube} = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);