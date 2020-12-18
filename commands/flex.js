module.exports ={
    name: 'flex',
    description: "this is a flex command!",
    execute(message, args){
        message.react('🇫')
			.then(() => message.react('🇱'))
            .then(() => message.react('🇪'))
            .then(() => message.react('🇽'))
            .catch(() => console.error('One of the emojis failed to react.'));
    }
}
