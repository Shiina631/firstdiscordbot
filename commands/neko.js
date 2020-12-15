module.exports ={
    name: 'neko',
    description: "this is a neko command!",
    execute(message, args){
        message.channel.send('Meow');
        if(args[0] === '1'){
            message.channel.send('Meow Meow');
        } 

    }
}