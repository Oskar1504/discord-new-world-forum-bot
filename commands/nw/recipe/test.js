const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


module.exports = {
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('back')
                    .setLabel('Back')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('reset')
                    .setLabel('Reset')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('forward')
                    .setLabel('Forward')
                    .setStyle('PRIMARY'),
            );
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Embed 1")
                    .addField("Field1","value")
                    .addField("Field2","value")
                    .setColor("GREEN")
                    .setFooter("Footer")
                    .setAuthor("Author")
                    .setURL('https://discord.js.org')
                    .setTimestamp(new Date()),
                new MessageEmbed()
                    .setTitle("Embed 2")
                    .addField("Field1","value")
                    .setColor("GOLD")
                    .setFooter("Footer")
                    .setAuthor("Author")
                    .setURL('https://discord.js.org')
                    .setTimestamp(new Date()),
                new MessageEmbed()
                    .setTitle("Embed 3")
                    .addField("Field1","value")
                    .addField("Field2","value")
                    .addField("Field3","value")
                    .addField("Field2","value")
                    .setColor("BLURPLE")
                    .setFooter("Footer")
                    .setAuthor("Author")
                    .setURL('https://discord.js.org')
                    .setTimestamp(new Date()),
                new MessageEmbed()
                    .setTitle("Embed 4")
                    .setColor("RED")
                    .setFooter("Footer")
                    .setAuthor("Author")
                    .setURL('https://discord.js.org')
                    .setTimestamp(new Date()),
            ],
            components:[row]
        })
    }
};