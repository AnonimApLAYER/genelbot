const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Global komutlar silinmeye başlandı.');

        // Tüm global komutları al
        const commands = await rest.get(
            Routes.applicationCommands(clientId)
        );

        // Her bir komut için silme işlemi yap
        for (const command of commands) {
            await rest.delete(
                Routes.applicationCommand(clientId, command.id)
            );
        }

        console.log('Global komutlar başarıyla silindi.');
    } catch (error) {
        console.error(error);
    }
})();
