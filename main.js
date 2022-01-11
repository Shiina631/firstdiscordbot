require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const fetch = require('node-fetch');

const client = new Discord.Client();
const prefix = '';

//database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

// const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

client.once('ready', () => {
    console.log('HAIYA, online jo la');
    client.user.setActivity('Cute Meow and Cute You', { type: 'WATCHING' });

    Tags.sync();
});

//hentai summon machine
client.on('message', async message => {
    const amount = parseInt(message);
    if (message.author.bot || isNaN(amount) || amount < 100000 || amount > 999999) return;
    //https://nhentai.net/g/139517
    //629163839149309972
    message.channel.send(`https://nhentai.net/g/${amount} Will delete in 30seconds, Fast Fast bookmark it.`)
        .then(msg => {
            msg.delete({ timeout: 30000 /*30sc*/ });
        })
        .catch();

    //setTimeout(() => message.delete(), 2000);
    //message.channel.send(`https://nhentai.net/g/${amount}`);

});

/*client.on('message', async message => {
    var user = message.author.id;
    if (user === "246553923157098496") {
        message.channel.send(`Diam la, ${message.author.username}`)
            .then(msg => {
                msg.delete({ timeout: 500  });
            })
            .catch();
    }

});*/

// my own server id: 594154715449655296
// group kaixin-channel id: 818107114890330113
// my own test server channel id: 788336053844443146
// group spam channel id: 629163839149309972

client.on('messageDelete', message => {
    var server = message.guild.id;
    var user = message.author.id;
    if (server === "594154715449655296" || message.author.bot || user === "367634753161003008" || message.attachments.size) return;
    //
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Delete')
        .setAuthor(message.author.username, client.user.displayAvatarURL())
        .setDescription(`This pokai delete a message in <#${message.channel.id}>.`)
        .setThumbnail(message.author.avatarURL())
        .addFields(
            { name: 'Deleted message', value: message }
        )
        .setTimestamp();
    client.channels.cache.get('818107114890330113').send(exampleEmbed);

    // testtt
    // if (message.author.bot || message.attachments.size) return;
    // const embedtwo = new Discord.MessageEmbed()
    //     .setColor('#0099ff')
    //     .setTitle('Delete')
    //     .setAuthor(message.author.username, client.user.displayAvatarURL())
    //     .setDescription(`This pokai delete a message in <#${message.channel.id}>.`)
    //     .setThumbnail(message.author.avatarURL())
    //     .addFields(
    //         { name: 'Deleted message', value: message }
    //     )
    //     .setTimestamp();
    //     client.channels.cache.get('930413685070000148').send(embedtwo);
    //     if (message.author.bot) return;
    // if (message.attachments.size) message.channel.send({files: [message.attachments.first()]})
    //client.channels.cache.get('818107114890330113').send(`Delete. ${message.author.tag}: "${message}"`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    var server = oldMessage.guild.id;
    var user = oldMessage.author.id;
    if (server === "594154715449655296" || user === "367634753161003008" || oldMessage.author.bot || oldMessage.content.startsWith('http')) return;
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(oldMessage.author.id)
        .setAuthor(oldMessage.author.username, client.user.displayAvatarURL())
        .setDescription(`This pokai edit a message in <#${oldMessage.channel.id}>.`)
        .setThumbnail(oldMessage.author.avatarURL())
        .addFields(
            { name: 'Original message', value: oldMessage }
        )
        .addField('After edit', newMessage, true)
        .setTimestamp();

    client.channels.cache.get('818107114890330113').send(exampleEmbed);
    //client.channels.cache.get('818107114890330113').send(`Edit. ${oldMessage.author.tag}: "${oldMessage}" changed to "${newMessage}"`);
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (message.attachments.size){
        client.channels.cache.get('930413685070000148').send({files: [message.attachments.first()]})
        client.channels.cache.get('930413685070000148').send(`Send by ${message.author.username}, id: ${message.url}`)
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();


    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);


    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    // if (!cooldowns.has(command.name)) {
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const now = Date.now();
    // const timestamps = cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown || 1) * 1000;

    // if (timestamps.has(message.author.id)) {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    //     }
    // }

    // timestamps.set(message.author.id, now);
    // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.execute(message, args);

    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


// remove function tag
// client.on('message', async message => {
//     const prefix = '+';

//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     const commandArgs = args.join(' ');

//     if (commandName === 'cat') {
//         const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
//         message.channel.send(file);
//     } else if (commandName === 'help') {
//         const exampleEmbed = new Discord.MessageEmbed()
//             .setColor('#0099ff')
//             .setTitle('Help')
//             .setAuthor('Some name', 'https://i.imgur.com/XsQdB9k.png', 'https://discord.js.org')
//             .setDescription('Some description here')
//             .setThumbnail('https://i.imgur.com/XsQdB9k.png')
//             .addFields(
//                 { name: 'Nothing to write', value: 'haiya' }
//             )
//             .addField('cincai la', 'Hi', true)
//             .setTimestamp();
//         message.channel.send(exampleEmbed);
//     } else if (commandName === 'add') {
//         const splitArgs = commandArgs.split(' ');
//         const tagName = splitArgs.shift();
//         const tagDescription = splitArgs.join(' ');

//         try {
//             // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
//             const tag = await Tags.create({
//                 name: tagName,
//                 description: tagDescription,
//                 username: message.author.username,
//             });
//             return message.reply(` ${tag.name} successfully added.`);
//         } catch (e) {
//             if (e.name === 'SequelizeUniqueConstraintError') {
//                 return message.channel.send(` ${tag.name} already exists.`);
//             }
//             return message.channel.send(`Something went wrong when adding ${tag.name}.`);
//         }
//         // } else if (commandName === 'tag') {
//         // const tagName = commandArgs;

//         // // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
//         // const tag = await Tags.findOne({ where: { name: tagName } });
//         // if (tag) {
//         //     // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
//         //     tag.increment('usage_count');
//         //     return message.channel.send(tag.get('description'));
//         // }
//         // return message.reply(`Could not find tag: ${tagName}`);
//     } else if (commandName === 'edit') {
//         const splitArgs = commandArgs.split(' ');
//         const tagName = splitArgs.shift();
//         const tagDescription = splitArgs.join(' ');
//         // equivalent to: UPDATE tags (descrption) values (?) WHERE name = ?;
//         const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
//         if (affectedRows > 0) {
//             return message.channel.send(`Tag ${tagName} was edited.`);
//         }
//         return message.channel.send(`Tag ${tagName} not exist.`);
//     } else if (commandName === 'info') {
//         const tagName = commandArgs;
//         // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
//         const tag = await Tags.findOne({ where: { name: tagName } });
//         if (tag) {
//             return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
//         }
//         return message.channel.send(`Tag ${tagName} not exist.`);
//     } else if (commandName === 'showtags') {
//         // equivalent to: SELECT name FROM tags;
//         const tagList = await Tags.findAll({ attributes: ['name'] });
//         const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
//         return message.channel.send(`List of tags: ${tagString}`);
//     } else if (commandName === 'delete') {
//         // equivalent to: DELETE from tags WHERE name = ?;
//         const tagName = commandArgs;
//         const rowCount = await Tags.destroy({ where: { name: tagName } });
//         if (!rowCount) return message.channel.send(`Tag ${tagName} not exist.`);

//         return message.channel.send(`Tag ${tagName} deleted.`);
//     }

//     // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
//     try {
//         const tag = await Tags.findOne({ where: { name: commandName } });
//         if (tag) {
//             // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
//             tag.increment('usage_count');
//             return message.channel.send(tag.get('description'));
//         }
//     } catch (e) {
//         console.log(e);
//         return message.reply(`Could not find tag: ${commandName}`);
//     }
// });

client.login(process.env.BOT_TOKEN);