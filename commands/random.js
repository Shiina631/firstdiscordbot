module.exports ={
    name: 'random',
    description: "this is a random command!",
    execute(message, args){
        if (!args.length) {
            message.reply('Let Neko chan choose it! Let Neko chan choose it!');
        }else{
            var randomIndex = Math.floor(Math.random() * args.length); // gets a random number based on the array's length
            var randomElement = args[randomIndex]; 
            
            message.channel.send(`${randomElement} ba! Neko chan choose this randomly!`);

            // if (!message.mentions.users.size) {
            //     message.reply('you need to tag a user in order to kick them!');
            // }else{
            //     const taggedUser = message.mentions.users.first();
            //     message.channel.send(`${message.author} kick ${taggedUser} ass.`);
            // }

        }
        
        
    }
}