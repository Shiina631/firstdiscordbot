module.exports = {
    name: 'vote',
    description: "this is a vote command!",
    execute(message, args) {
        const filter = (reaction) => {
            return reaction.emoji.name === '👍';
        };
        // message.react('👍').then(() => message.react('👎'));
        const collector = message.createReactionCollector(filter, { time: 5000 });

        collector.on('collect', (reaction) => {
            message.channel.send(`Collected ${reaction.emoji.name}`);
        });
        
        collector.on('end', collected => {
            message.channel.send(`Total ${collected.size} users give a  '👍' `);
        });

        // const filter = (reaction, user) => {
        //     return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        // };

        // message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        //     .then(collected => {
        //         const reaction = collected.first();

        //         if (reaction.emoji.name === '👍') {
        //             message.reply('you reacted with a thumbs up.');
        //         } else {
        //             message.reply('you reacted with a thumbs down.');
        //         }
        //     })
        //     .catch(collected => {
        //         message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
        //     });

    }
}
