module.exports ={
    name: 'mooorning',
    description: "this is a mooorning command!",
    execute(message, args){
        if (!args.length) {
            message.channel.send("Mooorning", { files: ["./files/morning.mp4"] });
        
        } 
    }
}
