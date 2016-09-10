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
        let userName = event.target.userName.value;
        let emailVar = event.target.registerEmail.value;
        let passwordVar = event.target.registerPassword.value;
        if(userName && emailVar && passwordVar ) {
            if (!Template.instance().userExists.get()) {
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
            } else {
                toastr.error('Username already registered.');
            }
        }
        else{
            toastr.error("Please enter all information");
        }
    },
    'blur .username': function(event, template){
        if(!$('.username').hasClass("error")) {
            let userExists = !!Meteor.users.findOne({
                username: event.target.value
            });
            template.userExists.set(userExists);
        }
    },
    'click .linkLogin': function() {
        Router.go('/');
    }
});
