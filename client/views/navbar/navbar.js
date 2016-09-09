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

Template.navbar.helpers({

    searchSettings: function() {
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
    'keyup #searchUser1': function (event, template) {
        event.preventDefault();
        var friend = template.existingFriend.get();
        var array = template.friendList.get();
        if(event.keyCode === 13) {
            var user = $('#searchUser').val();
            var userExist = Meteor.users.find({username: user}).fetch();
            if(userExist && userExist.length > 0) {
                console.log('user', user);
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
                        template.existingContact.set(contact);
                        template.friendList.set(array);
                    }
                }else{
                    if (!isUserExist(array, user)) {
                        array.push({'username': user});
                        friend.friends = array;
                        template.existingFriend.set(friend);
                        template.friendList.set(array);
                        Meteor.call('friend.update', friend);
                    }
                }
            }
        }
    }
});

