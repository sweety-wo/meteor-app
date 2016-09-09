var addMessageRowClass = function () {
    return "messageRow";
};

Template.inbox.helpers({

    mail: function(){
        var mail = [];
        var count = Mail.find({to: Meteor.user().username, isDraft : false}).count();
        if(count  > 0) {
            mail = Mail.find({
                to: Meteor.user().username,
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
                {key: 'from', label: 'Received From', sortable: false, cellClass:addMessageRowClass},
                {key: 'subject', label: 'Subject', sortable: false,
                    fn: function(value, object){
                        var html =  '<strong>' +  object.subject + '</strong> - ' + UI._globalHelpers['textTruncate'](object.message, object.subject);
                        return new Spacebars.SafeString(html);
                    },
                    cellClass:addMessageRowClass},
                {key: 'createdAt', label: 'Received Date' ,headerClass :'dateColumn', fn: function(value){
                    var html = '<div class="textAlignRight">' + UI._globalHelpers['formatDate'](value)+ '</div>'
                    return new Spacebars.SafeString(html);
                },
                    sortable: false, cellClass:addMessageRowClass}
            ]
        }
    }
});
