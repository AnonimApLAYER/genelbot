const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('çeviriv2')
        .setDescription('Metni çevir.')
        .addStringOption(option =>
            option.setName('metin')
                .setDescription('Çevrilecek metin')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('hedef_dil')
                .setDescription('Hedef dil kodu')
                .setRequired(true)
        ),
    async execute(interaction) {
        const metin = interaction.options.getString('metin');
        const hedefDil = interaction.options.getString('hedef_dil');

        // Burada çeviri işlemi için bir API kullanılacak
        // Örnek olarak, burada bir API isteği yapılacak ve çeviri sonucu alınacak
        // Bu örnekte API isteği ve yanıtı gösterilmemektedir

        // API'den alınan çeviri sonucunu 'translatedText' değişkenine atayın
        const translatedText = 'Çeviri sonucu burada olacak';

        await interaction.reply(`Çeviri: ${translatedText}`);
    },
};
