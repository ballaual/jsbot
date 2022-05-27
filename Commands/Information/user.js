const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    type: "USER",
    context: true,
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction)  {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        await target.user.fetch();

        const getPresence = (status) => {
            const statusType = {
                idle: "1FJj7pX.png",
                dnd: "fbLqSYv.png",
                online: "JhW7v9d.png",
                invisible: "dibKqth.png"
            };

            return `https://i.imgur.com/${statusType[status] || statusType["invisible"]}`;
        };

        const Response = new MessageEmbed()
        .setColor("#303135")
        .setAuthor({ name: target.user.tag, iconURL: getPresence(target.presence?.status) })
        .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
        .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
        .addFields(
            { name: "ID", value: target.user.id },
            { name: "Joined server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
            { name: "Account created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: "Roles", value: target.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "No Roles defined" },
            { name: "Nickname", value: target.nickname || "No Nickname set", inline: true },
            { name: "Stauts", value: target.presence?.status, inline: true },
            { name: "Banner", value: target.user.bannerURL() ? "** **" : "No User Banner available" })

        interaction.reply({embeds: [Response], emphermal: true})

    }
}