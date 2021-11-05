const Embed = require("./../../../helper/Embed")
const { MessageActionRow, MessageButton } = require('discord.js');


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
                Embed.create("Emebd 1")
                    .getEmbed(),

                Embed.create("Embed 2")
                    .getEmbed(),

                Embed.create("Embed 3")
                    .getEmbed(),

                Embed.create("Embed 4")
                    .getEmbed()
            ],
            components:[row]
        })
    }
};