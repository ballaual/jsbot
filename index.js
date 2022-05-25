const { Client, Collection } = require("discord.js");
//Intent Calculator - https://ziad87.net/intents/
const client = new Client({intents: [131071]});
const { Token } = require("./config.json");

client.commands = new Collection()

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);