const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
require('dotenv').config()


const commands = [];

let commandFiles = []

//https://stackoverflow.com/a/36730872
let getFiles = function(path, files){
    fs.readdirSync(path).forEach(function(file){
        var subpath = path + '/' + file;
        if(fs.lstatSync(subpath).isDirectory()){
            getFiles(subpath, files);
        } else {
            files.push(path + '/' + file);
        }
    });
}

getFiles("./commands", commandFiles)
commandFiles = commandFiles.filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`${file}`);
    commands.push(command.data.toJSON());
}
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);