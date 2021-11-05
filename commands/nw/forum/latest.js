const Embed = require("./../../../helper/Embed")
const axios = require("axios")


module.exports = {
    async execute(interaction) {
        let topics = [],
            nw_host = "https://forums.newworld.com",
            axios_url = nw_host + "/latest.json"

        await axios.get(axios_url)
            .then(function (response) {
                console.log(response.request.url ,response.status);

                topics = response.data.topic_list.topics
                topics = topics.map( topic => {
                    return {
                        name: topic.title,
                        value:`Views:${topic.views} | Likes:${topic.like_count} | Replys: ${topic.reply_count}\n[Link](${nw_host}/t/${topic.slug})`
                    }
                })
            })
            .catch(function (error) {
                console.log(error.toString());
            })


        await interaction.reply({
            embeds: [
                Embed.create("Latest NW Forum posts", "", axios_url)
                    .setFields(Embed.createFieldMatrix(topics,1))
                    .getEmbed()
            ]
        })
    }
};