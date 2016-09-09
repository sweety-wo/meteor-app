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

