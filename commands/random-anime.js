const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, MessageAttachment } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'random-anime') {
        try {
            // Anime fotoğrafını almak için bir API'den istek yapın
            const response = await axios.get('https://pic.re/image');
            const imageUrl = response.data.imageUrl; // API'nin döndürdüğü resim URL'sini buraya yazın

            // Resmi bir eklenti olarak oluşturun
            const attachment = new MessageAttachment(imageUrl);

            // Kullanıcının DM'ine resmi gönderin
            await interaction.user.send({ files: [attachment] });
            await interaction.reply({ content: 'Rastgele bir anime fotoğrafı DM\'ine gönderildi!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bir hata oluştu, lütfen tekrar deneyin.', ephemeral: true });
        }
    }
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-anime')
        .setDescription('Rastgele bir anime fotoğrafı gönder.'),
    async execute(interaction) {
        await interaction.reply('Komut aktif!');
    },
};
