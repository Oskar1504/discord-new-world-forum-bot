require('dotenv').config()
const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    partials:["CHANNEL","MESSAGE","REACTION"]
});

// client.channels.cache.get(905875264796491796)

client.commands = new Collection();

let commandFiles =  fs.readdirSync("./commands")

commandFiles = commandFiles.filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);