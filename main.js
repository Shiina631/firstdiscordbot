require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();


const prefix = '';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

client.once('ready',() =>{
    console.log('HAIYA, online jo la');
});

client.on('message',message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'neko'){
        client.commands.get('neko').execute(message, args);
    } else if (command == 'gem'){
        client.commands.get('gem').execute(message, args);
    } else if (command == 'shakeit'){
        message.channel.send('https://cdn.discordapp.com/attachments/788336053844443146/788349264907730944/tenor.gif');
    }else if (command == 'speedo'){
        message.channel.send('https://media.discordapp.net/attachments/436810889329639426/750747521021771889/01-08-01-538226609686315018.gif');
    }

    

});

client.login(process.env.BOT_TOKEN);