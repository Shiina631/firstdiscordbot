module.exports ={
    name: 'meh',
    description: "this is a meh command!",
    execute(message, args){
        if (!args.length) {
            message.channel.send('https://images-ext-2.discordapp.net/external/Wem-6BA67uhTzP-6aUD31qkjhKlaDCaJp7pxD_768ds/%3Fv%3D1/https/cdn.discordapp.com/emojis/692361655950245928.png');        
        } 
    }
}
