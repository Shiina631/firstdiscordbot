require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '';

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
    
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
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

client.login(process.env.BOT_TOKEN);