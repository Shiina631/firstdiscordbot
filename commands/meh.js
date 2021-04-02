module.exports ={
    name: 'meh',
    description: "this is a meh command!",
    execute(message, args){
        if (!args.length) {
            message.channel.send('https://cdn.discordapp.com/emojis/692361655950245928.png?v=1');        
        } 
    }
}
