const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nw')
        .setDescription('Info about New World')
        .addSubcommandGroup(subcommandgroup =>
                subcommandgroup
                .setName('forum')
                .setDescription("Official New World forum")
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('latest')
                        .setDescription('Show latest NW forum posts.')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('post')
                        .setDescription('Show NW forum post.')
                        .addStringOption(option =>
                            option.setName('input')
                                .setDescription('Enter a string')
                                .addChoice("Oskar","oskar")
                                .addChoice("Oskar2","oskar2")
                                .addChoice("leo","dawd")
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('top')
                        .setDescription('Show top NW forum posts.')
                )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName('categories')
                            .setDescription('Show top NW forum categories.')
                    )
            )
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
                .setName('recipe')
                .setDescription("Official New World forum")
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('test')
                        .setDescription('Show latest NW forum posts.')
                )
        ),
    async execute(interaction) {
        let event = ""
        if(interaction.options.getSubcommandGroup()){
            event = require(`./${this.data.name}/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}`);
        }else{
            event = require(`./${this.data.name}/${interaction.options.getSubcommand()}`);
        }
        event.execute(interaction)
    },
};