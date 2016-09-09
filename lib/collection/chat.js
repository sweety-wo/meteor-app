Chat = new Mongo.Collection('chat');

Meteor.methods({
    'chat.insert': function (chat) {
        var result = Chat.insert({
            to: chat.to,
            from: chat.from,
            message: chat.message,
            createdAt: chat.createdAt
        });
        return result;
    }, 'chat.update': function (chat) {
        Chat.update(chat._id, {
            $set: {
                from: chat.from,
                to: chat.to,
                message: chat.message
            }
        })
    }
});



