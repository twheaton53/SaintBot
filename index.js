const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message');
const privateMessage = require('./private-message');
const { dirname } = require('path');

client.on('ready', () => {
    console.log('The client is ready')

    const baseFile = 'commandBase.js';
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(client, option);
            }
        }
    }

    readCommands('commands');

    firstMessage(client, '859503619477078036', 'hello world!!!', ['✨', '✌']);
    privateMessage(client, 'ping', 'Pong!');

    command(client, 'embed', (message) => {
        // !embed

        const embed = new Discord.MessageEmbed()
            .setTitle('Example text embed')
            .setURL('https://na.finalfantasyxiv.com/lodestone/topics/detail/0d64dd14ca831bb14d6f4810e414a097bf6f94cd')
            .setAuthor(message.author.username)

        message.channel.send(embed);
    })

});

client.login(config.token);

// command(client, ['ping', 'test'], (message) => {
//     message.channel.send('Pong!');
// });

// command(client, 'servers', message => {
//     client.guilds.cache.forEach(guild => {
//         message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
//     });
// });

// command(client, ['cc', 'clearchannel'], message => {
//     if (message.member.hasPermission('ADMINISTRATOR')) {
//         message.channel.messages.fetch().then(results => {
//             message.channel.bulkDelete(results);
//         });
//     }
// })

// command(client, 'status', message => {
//     const content = message.content.replace('!status ', '');

//     client.user.setPresence({
//         activity: {
//             name: content,
//             type: 0,
//         }
//     });
// })