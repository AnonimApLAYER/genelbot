const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('duyurumod')
    .setDescription('Bir kanala duyuru gönder')
    .addChannelOption(option => 
      option.setName('kanal')
        .setDescription('Duyurunun gönderileceği kanalı seçin')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('mesaj')
        .setDescription('Gönderilecek duyuru mesajını girin')
        .setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel('kanal');
    const message = interaction.options.getString('mesaj');

    if (!channel.isText()) {
      return interaction.reply('Lütfen bir metin kanalı seçin.');
    }

    await channel.send(message);
    await interaction.reply(`Duyuru ${channel} kanalına başarıyla gönderildi.`);
  },
};
