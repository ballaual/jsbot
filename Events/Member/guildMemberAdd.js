const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { webhookToken, webhookId } = require("../../config.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member;

        member.roles.add("979673578867937290"); //@test
        const Welcomer = new WebhookClient({
            "id": `${webhookId}`,
            "token": `${webhookToken}`,
        });

        const Welcome = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}** server!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
        Latest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)

        Welcomer.send({embeds: [Welcome]})
    }
}