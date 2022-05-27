const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
    description: "Deletes a specified number of messages from a channel or a target",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "The amount of messages to delete",
            type: "NUMBER",
            required: true,
        },
        {
            name: "target",
            description: "Select The Target That You Want To Delete The Messages From",
            type: "USER",
            required: false,
        }

    ],
    /**
    *
    *@param { CommandInteraction } interaction
    */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount")
        const Target = options.getMember("target")

        const Msg = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("RANDOM")

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Msg).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++
                }
            })
            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} messages from ${Target}.`);
                interaction.reply({ embeds: [Response], ephemeral: true });

            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} messages from this channel.`);
                interaction.reply({ embeds: [Response], ephemeral: true });
            })
        }

    }
}