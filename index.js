const { Client, Intents } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (!command.data || !command.execute) {
        console.error(`Geçersiz komut dosyası: ${file}`);
        continue;
    }
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (!client.commands.has(commandName)) return;

    try {
        await client.commands.get(commandName).execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Komut yürütülürken bir hata oluştu.', ephemeral: true });
    }
});


client.login(token);