var addMessageRowClass = function () {
    return "messageRow";
};

Template.sentMail.helpers({

    mail: function(){
        var mail = [];
        var count = Mail.find({from: Meteor.user().username, isDraft : false}).count();
        if(count  > 0) {
            mail = Mail.find({
                from: Meteor.user().username,
                isDraft : false
            }, {sort: {createdAt: -1}});
        }
        return mail;
    },
    setting: function() {
        return {
            showFilter: false,
            showNavigation: 'never',
            fields: [

                {key: 'to', label: 'Sent To', sortable: false, cellClass:addMessageRowClass},
                {key: 'subject', label: 'Subject', sortable: false,
                    fn: function(value, object){
                        var html =  '<strong>' +  object.subject + '</strong> - ' + UI._globalHelpers['textTruncate'](object.message, object.subject);
                        return new Spacebars.SafeString(html);
                    },
                    cellClass:addMessageRowClass},
                {key: 'createdAt', label: 'Sent Date', headerClass :'dateColumn', fn: function(value){
                    var html = '<div>' + UI._globalHelpers['formatDate'](value)+ '</div>';
                    return new Spacebars.SafeString(html);
                },
                    sortable: false, cellClass:addMessageRowClass}
            ]
        }
    }
});

Template.sentMail.events({
    'click .reactive-table tbody tr':function(event){
        if(event.target.className === "messageRow") {
            Router.go('inbox/:username/:_id', {username: this.username, _id: this._id});
        }
    },

});

