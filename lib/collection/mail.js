Mail = new Mongo.Collection('mail');

Meteor.methods({
    'mail.insert': function(mail){
        return Mail.insert({
            from: mail.from,
            to: mail.to,
            message: mail.message,
            subject: mail.subject,
            createdAt: new Date(),
            username: mail.from,
            isDraft: mail.isDraft
        });
    },'mail.update': function(mail, id){
        Mail.update(id, {
            $set: {
                from: mail.from,
                to: mail.to,
                message: mail.message,
                subject: mail.subject,
                username: mail.from,
                isDraft: mail.isDraft
            }
        }, function(err) {
            if(Meteor.isClient) {
                if (err) {
                    if(!mail.isDraft){
                        toastr.error('Bolt creation failed.');
                    }
                } else {
                    if(!mail.isDraft){
                        toastr.success('Bolt created successfully.');
                    }
                }
            }
        });
    }
});
