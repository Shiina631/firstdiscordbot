module.exports ={
    name: 'kick',
    description: "this is a kick command!",
    execute(message, args){
        if (!args.length) {
            message.reply('you need to tag a user in order to kick them!');
        }else{
            message.channel.send(`${message.author} kick ${args} ass.`);

            // if (!message.mentions.users.size) {
            //     message.reply('you need to tag a user in order to kick them!');
            // }else{
            //     const taggedUser = message.mentions.users.first();
            //     message.channel.send(`${message.author} kick ${taggedUser} ass.`);
            // }

        }
        
        
    }
}