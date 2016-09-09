Template.signUp.onCreated(function() {
    this.userExists = new ReactiveVar();
});

Template.signUp.helpers({
    userExists: function() {
        return Template.instance().userExists.get();
    }
});

Template.signUp.events({
    'submit form': function(event) {
        event.preventDefault();
        var userName = event.target.userName.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;

        if(!Template.instance().userExists.get()) {
            Accounts.createUser({
                username: userName,
                email: emailVar,
                password: passwordVar
            }, function (err) {
                if (err) {
                    toastr.error('Sign up failed: ' + err.reason);
                } else {
                    toastr.success('You have signed up successfully.');
                    Meteor.loginWithPassword(emailVar, passwordVar);
                    Router.go('inbox');
                }
            });
        }else {
            toastr.error('Username already registered.');
        }

    },
    'blur .username': function(event, template){
        if(!$('.username').hasClass("error")) {
            var userExists = !!Meteor.users.findOne({
                username: event.target.value
            });
            template.userExists.set(userExists);
        }
    }
});
