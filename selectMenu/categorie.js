const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');
const axios = require("axios")


module.exports = {
    async execute(interaction) {
        let nw_host = "https://forums.newworld.com",
            axios_url = nw_host + interaction.values[0]

        await axios.get(axios_url)
            .then(async function (response) {
                console.log(axios_url, response.status);

                let fields = response.data.topic_list.topics.slice(0,24)
                let selectOptions = fields.map( elm => {
                    return {
                        label:elm.title.slice(0,99),
                        description:`Views:${elm.views} | Likes:${elm.like_count} | Replys: ${elm.reply_count}`,
                        value:`/t/${elm.id}.json`
                    }
                })
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('topic')
                            .setPlaceholder('Select topic for details')
                            .addOptions(selectOptions)
                            .setMaxValues(1),
                    );
                let p = interaction.message.components
                p.push(row)
                await interaction.message.edit({components:p})
                interaction.deferUpdate(true)
                // await interaction.reply({
                //     content:"Select an post",
                //     components:[row]
                // })
            })
            .catch(async function(error) {
                console.log(error.toString());
                 await interaction.reply({
                    content: `Error ${error.toString()}`,
                     ephemeral:true
                })
            })
    }
};