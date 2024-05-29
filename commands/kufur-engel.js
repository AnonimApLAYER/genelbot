const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('küfür-engel')
    .setDescription('Küfür engelleme özelliğini aç veya kapat')
    .addBooleanOption(option => 
      option.setName('aktif')
        .setDescription('Küfür engellemeyi açık veya kapalı yap')
        .setRequired(true)),
  async execute(interaction) {
    const aktif = interaction.options.getBoolean('aktif');
    // Küfür engelleme durumunu bir yere kaydetmek için kod buraya eklenecek
    // Örneğin, bir veritabanına veya bir JSON dosyasına

    await interaction.reply(`Küfür engelleme özelliği ${aktif ? '**açık**' : '**kapalı**'} olarak ayarlandı.`);
  },
};
