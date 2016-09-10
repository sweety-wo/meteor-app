Template.messageView.helpers({
    mail: function(){
       let mail =  Mail.findOne({_id: this._id});
       return mail;
    }
});