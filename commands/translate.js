const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Metni istediğin dile çevir.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Çevrilecek metin')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('target_lang')
                .setDescription('Hedef dilin kodu (örn: en, es, fr)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const targetLang = interaction.options.getString('target_lang');

        try {
            const res = await translate(text, { to: targetLang });
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Çeviri Sonucu')
                .addField('Orijinal Metin', text)
                .addField('Çevrilen Metin', res.text)
                .addField('Hedef Dil', targetLang.toUpperCase());

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bir hata oluştu, lütfen tekrar deneyin.', ephemeral: true });
        }
    },
};
