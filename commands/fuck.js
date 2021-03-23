module.exports = {
    name: 'fuck',
    description: "this is a kick command!",
    execute(message, args) {
        if (!args.length) {
            message.reply('Fuck who? Fuck who?');
        } else {
            const text = args.join(' ');
            message.channel.send(`${message.author} is horny now. Want to fuck ${text}'s ass.`);

            // if (!message.mentions.users.size) {
            //     message.reply('you need to tag a user in order to kick them!');
            // }else{
            //     const taggedUser = message.mentions.users.first();
            //     message.channel.send(`${message.author} kick ${taggedUser} ass.`);
            // }

        }


    }
}