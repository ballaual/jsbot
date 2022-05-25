const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { GuildId } = require("../config.json");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name) 
        return Table.addRow(file.split("/")[7], "🔺 FAILED", "Missing a name.")

        if(!command.description)
        return Table.addRow(command.name, "🔺 FAILED", "Missing a description.")


        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "🔹", " Successful.");

    })

    console.log(Table.toString());

    // PERMISSIONS CHECK //

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get(GuildId);

        MainGuild.commands.set(CommandsArray)
    })
}