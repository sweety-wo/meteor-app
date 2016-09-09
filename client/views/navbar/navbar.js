var isUserExist = function (array, user) {
    var isExist = false
    for(var i = 0; i < array.length; i++){
        if(user === array[i].username){
            isExist = true;
            return isExist;
        }
    }
    return isExist;
};

Template.navbar.onCreated(function() {
    this.existingFriend = new ReactiveVar();
    this.friendList = new ReactiveVar();
});

Template.navbar.helpers({
    friends: function(){
        var friend = 0;
        if(Meteor.user()){
            friend = Friend.findOne();
        }
        if(friend)
        {
            return friend.friends;
        }
    },
    searchSettings: function() {
        var array = [];
        if(Meteor.user()) {
            var friend = {};
            if (!Template.instance().existingFriend.get()) {
                friend = Friend.findOne();
                Template.instance().existingFriend.set(friend);
            } else {
                friend = Template.instance().existingFriend.get();
            }
            if (friend) {
                array = friend.friends;
            }

            Template.instance().friendList.set(array);

            var filterUser = [];
            for (var u in array) {
                filterUser.push(array[u].username);
            }

            var localFriends = new Mongo.Collection(null);
            Meteor.users.find({username: {$nin: filterUser}}).observe({
                added: function (user) {
                    localFriends.insert(user);
                }
            });
        }
        return {
            position: "bottom",
            rules: [
                {
                    collection:Meteor.users,
                    field: "username",
                    template: Template.usernameAutoComplete
                }
            ]
        }
    }
});

Template.navbar.events({
    'click .userLogout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    },
    'keyup #searchUser': function (event, template) {
        event.preventDefault();
        var friend = template.existingFriend.get();
        var array = template.friendList.get();
        if(event.keyCode === 13) {
            var user = $('#searchUser').val();
            var userExist = Meteor.users.find({username: user}).fetch();
            if(userExist && userExist.length > 0) {
                if (!friend) {
                    friend = {};
                    friend.createdBy = Meteor.user().username;
                    if (!isUserExist(array, user)) {
                        array.push({'username': user});
                        friend.friends = array;
                        Meteor.call('friend.insert', friend, function(err, result){
                            if (result){
                                friend._id = result;
                            }
                        });
                        template.existingFriend.set(friend);
                        template.friendList.set(array);
                        $('#searchUser').val('');
                    }
                }else{
                    if (!isUserExist(array, user)) {
                        array.push({'username': user});
                        friend.friends = array;
                        template.existingFriend.set(friend);
                        template.friendList.set(array);
                        Meteor.call('friend.update', friend);
                        $('#searchUser').val('');
                    }
                }
            }
        }
    }
});

