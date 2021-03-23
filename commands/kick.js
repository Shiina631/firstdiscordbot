module.exports = {
    name: 'kick',
    description: "this is a kick command!",
    execute(message, args) {
        if (!args.length) {
            message.reply('Kick who? Kick who? Kick him! Kick her! Kick all pokai!!!');
        } else {
            const text = args.join(' ');
            message.channel.send(`${message.author} kick ${text}'s ass.`);

            // if (!message.mentions.users.size) {
            //     message.reply('you need to tag a user in order to kick them!');
            // }else{
            //     const taggedUser = message.mentions.users.first();
            //     message.channel.send(`${message.author} kick ${taggedUser} ass.`);
            // }

        }


    }
}