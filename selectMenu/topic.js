
const axios = require("axios")
const { convert } = require('html-to-text');

module.exports = {
    async execute(interaction) {
        let nw_host = "https://forums.newworld.com",
            axios_url = nw_host + interaction.values[0]

        await axios.get(axios_url)
            .then(async function (response) {
                console.log(axios_url, response.status);
                let posts = response.data.post_stream.posts.slice(0,10)
                posts = posts.map( elm => {
                    let c = convertPostToMsg(elm)
                    return {
                        content: (c.length < 1990)?c:c.slice(0,1990) + "\n..."
                    }
                })
                let thread = interaction.channel.threads.cache.find(x => x.name === response.data.title);
                if(thread){ await thread.delete();}

                thread = await interaction.channel.threads.create({
                    name: response.data.title,
                    autoArchiveDuration: 60
                });
                for (const post of posts) {
                    await thread.send(post)
                    //small delay
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
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

function convertPostToMsg(elm){
    return `---------------------------------\n>>> Author:${elm.username}\n\n ${convert(elm.cooked, {wordwrap: 130})}`
}