module.exports ={
    name: 'nmjhl',
    description: "this is a njhl command!",
    execute(message, args){
        message.react('🇳')
            .then(() => message.react('🇲'))
			.then(() => message.react('🇯'))
            .then(() => message.react('🇭')) 
            .then(() => message.react('🇱'))
            .catch(() => console.error('One of the emojis failed to react.'));
    }
}
