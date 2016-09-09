Meteor.publish('mail', function() {
    return Mail.find();
});
