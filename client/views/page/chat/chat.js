let isNotCurrentUser = function(){
    if(Router.current().params.username === Meteor.user().username) {
        return false;
    }else{
        return true;
    }
};

Template.chat.helpers({
    chat: function(){
        let toUser = Router.current().params.username;
        let chat = [];
        let count = Chat.find({
            $or:[
            {$and:[{from: Meteor.user().username},{to:toUser}]},
            {$and:[{to: Meteor.user().username},{from:toUser}]},

        ]}).count();
        if(count  > 0) {
            chat = Chat.find({
                $or:[
                    {$and:[{from: Meteor.user().username},{to:toUser}]},
                    {$and:[{to: Meteor.user().username},{from:toUser}]},

                ]}, {sort: {createdAt: 1}});
        }
        var objDiv = document.getElementsByClassName('chatParent');
        objDiv.scrollTop = objDiv.scrollHeight;
        return chat;
    }
});

Template.chat.events({
    'keyup #chatInput': function (event) {
        if(event.keyCode === 13) {
            let msg = $('#chatInput').val();
            if (msg) {
                let chat = {};
                chat.from = Meteor.user().username;
                chat.to = Router.current().params.username;
                chat.message = msg;
                chat.createdAt = new Date();
                Meteor.call('chat.insert', chat, function (err, result) {
                    if (result) {
                        chat._id = result;
                        $('#chatInput').val('');
                    }
                });
            }
        }
    },
    'click .sendChat': function (event) {
        let msg = $('#chatInput').val();
        if(msg) {
            let chat = {};
            chat.from = Meteor.user().username;
            chat.to = Router.current().params.username;
            chat.message = msg;
            chat.createdAt = new Date();
            Meteor.call('chat.insert', chat, function(err, result){
                if (result){
                    chat._id = result;
                    $('#chatInput').val('');
                }
            });
        }
    }
});
