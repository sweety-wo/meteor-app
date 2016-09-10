let setMailObj = function() {
    let mail = {};
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

let addToDraft = function(){
    let mail = setMailObj();
    mail.isDraft = true;

    if(!Session.get('draftMailId')) {
        Meteor.call("mail.insert", mail, function (err, result) {
            Session.set('draftMailId',result);
        });
    }else {
        Meteor.call("mail.update", mail, Session.get('draftMailId'));
    }
};

Template.newMessage.rendered = function () {
    let toVal = '', subjectVal = '', messageVal = '', mailId = '';
    Session.set('draftMailId',undefined);
    if(LocalCollection.find().count() > 0) {
        let sentTo = LocalCollection.find().fetch();
        toVal = sentTo[0].to;
        subjectVal = sentTo[0].subject;
        messageVal = sentTo[0].message;
        mailId = sentTo[0]._id;
        $('#msgTo').val(toVal);
        $('#subject').val(subjectVal);
        $('#message').val(messageVal);
        if(sentTo[0].fromPage === 'draft'){
            Session.set('draftMailId', mailId);
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
        addToDraft();
    },
    'click .btnSend': function(event, template){
        let mail = setMailObj();
        if(!Session.get('draftMailId')) {
            mail.isDraft = false;
            Session.set('draftMailId',undefined);
            Meteor.call("mail.insert", mail, function (err, result) {
                Session.set('draftMailId',result);
            });
        }else {
            mail.isDraft = false;
            Meteor.call("mail.update", mail, Session.get('draftMailId'));
            Session.set('draftMailId',undefined);
        }
        $('#msgTo').val('');
        $('#subject').val('');
        $('#message').val('');
    }

});

