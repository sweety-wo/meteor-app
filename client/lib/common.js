LocalCollection = new Meteor.Collection(null);

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM-DD-YYYY');
});
Template.registerHelper('messageDate', function(date) {
    return moment(date).format('MMM DD');
});

Template.registerHelper('textTruncate', function(passedString, subject) {
    var message = passedString.substring(0, (63 - subject.length));
    return new Spacebars.SafeString(message);
});