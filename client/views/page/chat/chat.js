var isNotCurrentUser = function(){
    if(Router.current().params.username === Meteor.user().username) {
        return false;
    }else{
        return true
    }
};

Template.chat.helpers({
    chat: function(){
        var toUser = Router.current().params.username;
        var chat = [];
        var count = Chat.find({
            $or:[
            {$and:[{from: Meteor.user().username},{to:Router.current().params.username}]},
            {$and:[{to: Meteor.user().username},{from:Router.current().params.username}]},

        ]}).count();
        if(count  > 0) {
            chat = Chat.find({
                $or:[
                    {$and:[{from: Meteor.user().username},{to:Router.current().params.username}]},
                    {$and:[{to: Meteor.user().username},{from:Router.current().params.username}]},

                ]}, {sort: {createdAt: 1}});
        }
        return chat;
    }
});

Template.chat.events({
    'click .sendChat': function (event) {
        var msg = $('#chatInput').val();
        if(msg) {
            var chat = {};
            chat.from = Meteor.user().username;
            chat.to = Router.current().params.username;
            chat.message = msg;
            chat.createdAt = new Date();
            Meteor.call('chat.insert', chat, function(err, result){
                if (result){
                    chat._id = result;
                }
            });
        }
    }
});


