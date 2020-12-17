module.exports ={
    name: 'bird',
    description: "this is a bird command!",
    execute(message, args){
        if(args[0] === ''){
            message.channel.send('https://cdn.discordapp.com/attachments/788336053844443146/788349264907730944/tenor.gif');
        } else if (args[0] == 'speedo'){
            message.channel.send('https://media.discordapp.net/attachments/436810889329639426/750747521021771889/01-08-01-538226609686315018.gif');
        } 

    }
}