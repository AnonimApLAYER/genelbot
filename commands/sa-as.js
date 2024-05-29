const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('messageCreate', message => {
    // 'sa', 'selam', 'selamün aleyküm' gibi selamlamaları kontrol et
    if (message.content.toLowerCase().match(/\bsa\b|\bselam\b|\bselamün aleyküm\b/)) {
        // 'as hoşgeldin' ile yanıt ver
        message.channel.send('as hoşgeldin');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'sa-as') {
        await interaction.reply('Komut aktif! Selamlama mesajlarına otomatik yanıt verilecek.');
    }
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sa-as')
        .setDescription('Selamlama mesajlarına otomatik yanıt ver.'),
    async execute(interaction) {
        await interaction.reply('Komut aktif!');
    },
};
