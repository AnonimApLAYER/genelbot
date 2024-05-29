const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, MessageAttachment } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'random-gif') {
        try {
            // Giphy API'den rastgele bir GIF almak için istek yapın
            const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=OMuMh87UkZTt5uU9p0RkD5QPyrOe4xeg`);
            const gifUrl = response.data.data.images.original.url; // Giphy'nin döndürdüğü GIF URL'sini buraya yazın

            // GIF'i bir eklenti olarak oluşturun
            const attachment = new MessageAttachment(gifUrl);

            // Kullanıcının DM'ine GIF'i gönderin
            await interaction.user.send({ files: [attachment] });
            await interaction.reply({ content: 'Rastgele bir GIF DM\'ine gönderildi!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bir hata oluştu, lütfen tekrar deneyin.', ephemeral: true });
        }
    }
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-gif')
        .setDescription('Rastgele bir GIF gönder.'),
    async execute(interaction) {
        await interaction.reply('Komut aktif!');
    },
};
