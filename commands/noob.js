module.exports ={
    name: 'noob',
    description: "this is a noob command!",
    execute(message, args){
        message.react('🇳')
			.then(() => message.react('🅾️'))
            .then(() => message.react('🇴'))
            .then(() => message.react('🅱️'))
            .catch(() => console.error('One of the emojis failed to react.'));

    }
}
