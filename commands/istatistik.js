const { SlashCommandBuilder } = require('@discordjs/builders');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('istatistik')
    .setDescription('Botun istatistiklerini göster'),
  async execute(interaction) {
    const totalSeconds = (interaction.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);
    const uptime = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;

    const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
    const memoryUsage = `${usedMemory} MB / ${totalMemory} MB`;

    const cpuCount = os.cpus().length;

    await interaction.reply(`Bot İstatistikleri:
    - Çalışma Süresi: **${uptime}**
    - Bellek Kullanımı: **${memoryUsage}**
    - CPU Sayısı: **${cpuCount}**`);
  },
};
