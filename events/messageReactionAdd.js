module.exports = {
    name: 'messageReactionAdd',
    async execute(messageR) {
        if (messageR.message.author.id === messageR.user.id){
            console.log("dawd")
        }
        console.log("dawddddddddddd")
    },
};