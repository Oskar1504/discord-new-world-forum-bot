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
                        label:elm.title,
                        description:`Views:${elm.views} | Likes:${elm.like_count} | Replys: ${elm.reply_count}`,
                        value:`/t/${elm.id}.json`
                    }
                })
                fields = fields.map( elm => {
                    return {
                        name: elm.title,
                        value:`Views:${elm.views} | Likes:${elm.like_count} | Replys: ${elm.reply_count} | [Link](${nw_host}/t/${elm.slug})`
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

                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`NW Forum categorie ${interaction.values[0]}`)
                            .setURL(axios_url)
                            .setColor("GOLD")
                            .addFields(fields)
                            .setTimestamp(new Date())
                    ],
                    components:[row]
                })
            })
            .catch(async function(error) {
                console.log(error.toString());
                 await interaction.reply({
                    content: `Error ${error.status} while requesting ${axios_url}`,
                     ephemeral:true
                })
            })
    }
};