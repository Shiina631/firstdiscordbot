module.exports = {
    name: 'vote',
    description: "this is a vote command!",
    execute(message, args) {
        message.react('👍').then(() => message.react('👎'));
        const filter1 = (reaction) => {
            return reaction.emoji.name === '👍';
        };
        const filter2 = (reaction) => {
            return reaction.emoji.name === '👎';
        };
        
        const collector1 = message.createReactionCollector(filter1, { time: 15000 });
        const collector2 = message.createReactionCollector(filter2, { time: 15000 });

        
        collector1.on('collect1', (reaction) => {
            message.channel.send(`Collected ${reaction.emoji.name}`);
        });
        collector2.on('collect2', (reaction) => {
            message.channel.send(`Collected ${reaction.emoji.name}`);
        });
        
        
        collector1.on('end', collected1 => {
            message.channel.send(`${collected1.size} users give a  '👍' `);
        });
        collector2.on('end', collected2 => {
            message.channel.send(`${collected2.size} users give a  '👎' `);
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
