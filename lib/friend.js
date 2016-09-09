Friend = new Mongo.Collection('friend');

Meteor.methods({
    'friend.insert': function (friend) {
        var result = Friend.insert({
            createdBy: friend.createdBy,
            friends: friend.friends
        });
        return result;
    }, 'friend.update': function (friend) {
        Friend.update(friend._id, {
            $set: {
                friends: friend.friends
            }
        })
    }
});


