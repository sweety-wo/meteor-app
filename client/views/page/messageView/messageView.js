Template.messageView.helpers({
    mail: function(){
       var mail =  Mail.findOne({_id: this._id});
       return mail;
    }
});