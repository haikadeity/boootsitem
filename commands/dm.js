// commands/dm.js

const Discord = require('discord.js');

module.exports = {
  name: 'a',
  description: 'Belirtilen kullanıcıya bir DM mesajı gönderir.',
  usage: '!dm [@kullanıcı] [mesaj]',
  async execute(message, args, client) {
    const taggedUser = message.mentions.users.first();
    if (!taggedUser) return message.reply('Lütfen bir kullanıcı etiketleyin.');

    try {
      const dmChannel = await taggedUser.createDM();
      args.shift(); // İlk elemanı yani etiketi kaldırıyoruz.
      const dmMessage = args.join(' ');
      await dmChannel.send('Keyiniz:');
      await dmChannel.send(dmMessage);

      const successEmbed = new Discord.MessageEmbed()
        .setDescription(`Mesaj ${taggedUser.username}'a başarıyla gönderildi.`)
        .setColor('#2ecc71');

      message.channel.send(successEmbed);
      message.delete(); // Mesajı gönderen kanalda mesajı siler.
    } catch (error) {
      console.error(error);

      const errorEmbed = new Discord.MessageEmbed()
        .setDescription(`Mesaj ${taggedUser.username}'a gönderilemedi.`)
        .setColor('#e74c3c');

      message.channel.send(errorEmbed);
    }
  },
};
