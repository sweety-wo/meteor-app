Template.navbar.onCreated(function() {
    this.existingFriend = new ReactiveVar();
    this.friendList = new ReactiveVar();
});

Template.navbar.helpers({
    isActive: function (path) {
        if(Iron.Location.get().path.indexOf(path) > -1){
            return true;
        }else {
            return false;
        }
    },
    friends: function(){
        let friend = 0;
        if(Meteor.user()){
            friend = Friend.findOne();
        }
        if(friend)
        {
            return friend.friends;
        }
    },
    searchSettings: function() {
        let array = [];
        let localFriends = {};
        if(Meteor.user()) {
            let friend = {};
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

            let filterUser = [];
            for (let u in array) {
                filterUser.push(array[u].username);
            }

            localFriends = new Mongo.Collection(null);
            Meteor.users.find({username: {$nin: filterUser}}).observe({
                added: function (user) {
                    if(Meteor.user().username != user.username) {
                        localFriends.insert(user);
                    }
                }
            });
        }
        return {
            position: 'bottom',
            rules: [
                {
                    collection:localFriends,
                    field: 'username',
                    template: Template.usernameAutoComplete
                }
            ]
        };
    }
});

Template.navbar.events({
    'click .userLogout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },
    'click .friend': function (event) {
        event.preventDefault();
        Router.go('chat/:username', {username: this.username});
    },
    'keyup #searchUser': function (event, template) {
        event.preventDefault();
        let friend = template.existingFriend.get();
        let array = template.friendList.get();
        if(event.keyCode === 13) {
            let user = $('#searchUser').val();
            let userExist = Meteor.users.find({username: user}).fetch();
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

let isUserExist = function (array, user) {
    let isExist = false;
    for(let i = 0; i < array.length; i++){
        if(user === array[i].username){
            isExist = true;
            return isExist;
        }
    }
    return isExist;
};