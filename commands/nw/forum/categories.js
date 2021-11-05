const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');
const axios = require("axios")


module.exports = {
    async execute(interaction) {
        let categories = [],
            selectOptions = [],
            nw_host = "https://forums.newworld.com",
            axios_url = nw_host + "/categories.json"

        await axios.get(axios_url)
            .then(function (response) {
                console.log(axios_url, response.status);

                categories = response.data.category_list.categories
                selectOptions = categories.map( elm => {
                    return {
                        label:elm.name,
                        description:(elm.description.length < 100)?elm.description:elm.name,
                        value:`/c/${elm.id}.json`
                    }
                })
                categories = categories.map( elm => {
                    return {
                        name: elm.name,
                        value:`Id:${elm.id} | Posts:${elm.post_count} | Topics: ${elm.topics_all_time}\n[Link](${nw_host}/c/${elm.id})`
                    }
                })
            })
            .catch(function (error) {
                console.log(error.toString());
            })

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('categorie')
                    .setPlaceholder('Select categorie for latest posts')
                    .addOptions(selectOptions)
                    .setMaxValues(1),
            );

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("NW Forum categories")
                    .setURL(axios_url)
                    .setColor("ORANGE")
                    .addFields(categories)
                    .setTimestamp(new Date())
            ],
            components:[row]
        })
    }
};