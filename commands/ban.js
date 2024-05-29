const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageAttachment, Permissions } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bir kullanıcıyı yasakla ve yasaklama GIF\'i gönder.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Yasaklanacak kullanıcı')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply('Bu komutu kullanmak için yeterli izinlere sahip değilsiniz.');
        }

        const userToBan = interaction.options.getUser('kullanıcı');
        const banGifUrl = 'https://i.makeagif.com/media/12-12-2022/F9-K-x.gif'; // Yasaklama GIF'inin URL'si

        try {
            // Kullanıcıyı yasakla
            await interaction.guild.members.ban(userToBan);

            // Yasaklama GIF'ini gönder
            const attachment = new MessageAttachment(banGifUrl);
            await interaction.reply({ content: `${userToBan.tag} yasaklandı.`, files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Bir hata oluştu, kullanıcı yasaklanamadı.');
        }
    },
};
