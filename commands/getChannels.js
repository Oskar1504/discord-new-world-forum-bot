const { SlashCommandBuilder } = require('@discordjs/builders');
const Embed = require("./../helper/Embed")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getchannels')
        .setDescription('Replys all channels'),
    async execute(interaction) {
        let channels = await interaction.guild.channels.fetch(),
            fields = []

        channels.forEach(channel => {
            fields.push({
                name:channel.name,
                value:channel.type
            })
        })

        await interaction.reply({
            embeds: [
                Embed.create("Ehre")
                    .setFields(Embed.createFieldMatrix(fields,3))
                    .getEmbed()
            ]
        });
    },
};
