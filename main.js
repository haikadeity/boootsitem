// index.js

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
const checkInterval = 10 * 60 * 1000; // 5 dakikada bir kontrol et
const siteUrl = 'http://20.169.97.240'; // kontrol edilecek site URL'si
const statusChannelId = '1080908263194886244'; // durumun gönderileceği kanalın kimliği

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} aktif!`);

  // Son gönderilen mesajı saklamak için bir değişken oluştur
  let lastMessage;

  // Belirli aralıklarla site durumunu kontrol et
  setInterval(() => {
    axios.get(siteUrl)
      .then(response => {
        // Yanıtın durum kodunu kontrol et
        if (response.status === 200) {
          // Aktif durumunu kanala gönder
          const statusChannel = client.channels.cache.get(statusChannelId);
          const embed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`Site Durumu : <a:verify:1080903525065822388> `)
            .setThumbnail('https://i.imgur.com/mJ0KvgO.png')
            .setDescription('Site şu an aktif durumda')
            .setTimestamp();

          // Son mesajı sil ve yeni mesajı kaydet
          if (lastMessage) {
            lastMessage.delete();
          }
          statusChannel.send(embed).then(msg => {
            msg.react('👍');
            lastMessage = msg;
          });
        } else {
          // Kapalı durumunu kanala gönder
          const statusChannel = client.channels.cache.get(statusChannelId);
          const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`Site Durumu : <a:hata:1080902104320843858> `)
            .setThumbnail('https://i.imgur.com/O0DHQsi.png')
            .setDescription('Site şu an kapalı durumda')
            .setTimestamp();

          // Son mesajı sil ve yeni mesajı kaydet
          if (lastMessage) {
            lastMessage.delete();
          }
          statusChannel.send(embed).then(msg => {
            msg.react('👎');
            lastMessage = msg;
          });
        }
      })
      .catch(error => {
        // Hata durumunda hata mesajı gönder
        const statusChannel = client.channels.cache.get(statusChannelId);

        const embed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle(`Site Durumu : <a:hata:1080902104320843858> `)
          .setThumbnail('https://i.imgur.com/O0DHQsi.png')
          .setDescription(`Site şu an kapalı durumda`)
          .setTimestamp();

        // Son mesajı sil ve yeni mesajı kaydet
        if (lastMessage) {
          lastMessage.delete();
        }
        statusChannel.send(embed).then(msg => {
          msg.react('👎');
          lastMessage = msg;
        });
      });
  }, checkInterval);
});

client.login('MTA4MDg4OTMxODQxMjkxNDY4OA.G0SOl5.PG-FXU2X0gdwuU-fefwA7bTSX9lM0_pdhdkjtM'); // botunuzun tokenı
