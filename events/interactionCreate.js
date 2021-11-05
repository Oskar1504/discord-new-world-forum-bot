module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if(interaction.isButton()){
            console.log(interaction.message.embeds)
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
            await interaction.message.edit({embeds:interaction.message.embeds})
            await interaction.deferUpdate(true)
            return
        }

        if(interaction.isSelectMenu()){
            try{
                require(`./../selectMenu/${interaction.customId}`).execute(interaction)
            }catch (e) {
                console.error(e.toString());
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
            }
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