module.exports ={
    name: 'neko',
    description: "this is a neko command!",
    execute(message, args){
        if (!args.length) {
            message.channel.send('Meow');        
        } else if(args[0] === 'neko'){
            message.channel.send('Meow Meow');
        } else if (args[0] == 'emo'){
            message.channel.send('https://tenor.com/view/kitty-cat-depress-my-life-sad-gif-13253623');
        } else if (args[0] == 'angry'){
            message.channel.send('https://tenor.com/view/angry-cat-triggered-ahhh-meeeeoow-gif-16764869');
        } else if (args[0] == 'drive'){
            message.channel.send('https://tenor.com/view/cat-driving-serious-cat-driving-focus-driving-gif-15519638');
        } 

    }
}
