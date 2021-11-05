module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if(interaction.isButton()){
            console.log(interaction.customId)
            console.log("Button interaction")
            switch (interaction.customId){
                case "forward":
                    interaction.message.embeds.push(interaction.message.embeds.shift())
                    break
                case "reset":
                    break
                case "back":
                    interaction.message.embeds.unshift(interaction.message.embeds.pop())
                    break
            }
            interaction.message.edit({embeds:interaction.message.embeds})
            interaction.deferUpdate(true)
            return
        }

        if(interaction.isCommand()){
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
                console.debug(`[${this.name}]: ${interaction.commandName} by ${interaction.user.username}|${interaction.user.id} at ${interaction.createdAt}`)
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};