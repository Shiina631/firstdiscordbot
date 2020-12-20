module.exports ={
    name: 'cat',
    description: "this is a cat command!",
    execute(message, args){
        if (!args.length) {
            const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
            message.channel.send(file);       
        } 
    
    }
}