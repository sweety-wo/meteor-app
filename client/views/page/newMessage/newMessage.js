var setMailObj = function() {
    var mail = {};
    if(Meteor.user() && Meteor.user().username) {
        mail.from = Meteor.user().username;
    }else{
        mail.from = 'Anonymous'
    }
    if($('#msgTo').val()) {
        mail.to = $('#msgTo').val();
    }else{
        mail.to = 'Anonymous';
    }
    mail.subject = $('#subject').val();
    mail.message = $('#message').val();
    return mail;
};
var addToDraft = function(){
    var mail = setMailObj();
    mail.isDraft = true;

    if(!Session.get('draftMailId')) {
        Meteor.call("mail.insert", mail, function (err, result) {
            Session.set('draftBoltId',result);
        });
    }else {
        Meteor.call("bolts.update", mail, Session.get('draftBoltId'));
    }
};


Template.newMessage.rendered = function () {

    var toVal = '', subjectVal = '', messageVal = '', mailId = '';
    Session.set('draftBoltId',undefined);
    if(LocalCollection.find().count() > 0) {
        var sentTo = LocalCollection.find().fetch();
        toVal = sentTo[0].to;
        subjectVal = sentTo[0].subject;
        messageVal = sentTo[0].message;
        $('#msgTo').val(toVal);
        $('#subject').val(subjectVal);
        $('#message').val(messageVal);
        if(sentTo[0].fromPage === 'draft'){
            Session.set('draftBoltId', mailId);
        }
        addToDraft();
        LocalCollection.remove({});
    }
};


Template.newMessage.helpers({

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

Template.newMessage.events({
    'change .commonValue': function () {
        addToDraft()
    },
    'click .btnSend': function(event, template){
        var mail = setMailObj();
        if(!Session.get('draftBoltId')) {
            console.log("in");
            mail.isDraft = false;
            Session.set('draftBoltId',undefined);
            Meteor.call("mail.insert", mail, function (err, result) {
                Session.set('draftBoltId',result);
            });
        }else {
            mail.isDraft = false;
            Meteor.call("mail.update", mail, Session.get('draftBoltId'));
            Session.set('draftBoltId',undefined);
        }
        $('#msgTo').val('');
        $('#subject').val('');
        $('#message').val('');
    }

});

