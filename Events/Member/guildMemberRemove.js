const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { webhookToken, webhookId } = require("../../config.json");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member;
        
        const Welcomer = new WebhookClient({
            "id": `${webhookId}`,
            "token": `${webhookToken}`,
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} left the server!\n
        Latest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)

        Welcomer.send({embeds: [Welcome]})
    }
}