Template.login.helpers({

});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = event.target.loginEmail.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
      if(err){
        if(err.reason === 'User not found'){
          toastr.error('Login failed: ' + err.reason);
          Router.go('signUp');
        }else if(err.reason.indexOf('Please enter username') > -1){
          console.log("hello")
          var id = err.reason.replace('Please enter username ', '');
          var user = Meteor.users.findOne({_id: id});
        }else{
          toastr.error('Login failed: ' + err.reason);
        }
      }else {
        Router.go('inbox');
      }
    });
  },
});