const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saat')  // Update 'saat' to the desired command name
        .setDescription('Türkiye saati hakkında bilgi verir.'),
    async execute(interaction) {
        const currentTime = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        await interaction.reply(`Türkiye Saati: ${currentTime}`);
    },
};