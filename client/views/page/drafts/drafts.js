var addMessageRowClass = function () {
    return "messageRow";
};

Template.drafts.helpers({
    mail: function(){
        var mail = [];
        var username = 'Anonymous';
        if(Meteor.user() && Meteor.user().username) {
            username = Meteor.user().username;
        }

        var filter = {};
        filter.from = {$regex: new RegExp("^" + username, "i")};
        filter.isDraft = true;

        var count = Mail.find(filter).count();

        if(count  > 0) {
            mail = Mail.find(filter, {sort: {createdAt: -1}});
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
                {key: 'createdAt', label: 'Draft Date' ,headerClass :'dateColumn', fn: function(value){
                    var html = '<div>' + UI._globalHelpers['formatDate'](value)+ '</div>'
                    return new Spacebars.SafeString(html);
                },
                    sortable: false, cellClass:addMessageRowClass}
            ]
        }
    },
});

Template.drafts.events({
    'click .reactive-table tbody tr':function(event){
        if(event.target.className === "messageRow") {
            event.preventDefault();
            this.fromPage = 'draft';
            LocalCollection.insert(this);
            Router.go('newMessage');
        }
    }
});

