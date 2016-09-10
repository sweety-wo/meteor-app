Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    let emailVar = event.target.loginEmail.value;
    let passwordVar = event.target.loginPassword.value;
    if(emailVar && passwordVar) {
      Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
        if (err) {
          if (err.reason === 'User not found') {
            toastr.error('Login failed: ' + err.reason);
            Router.go('signUp');
          } else if (err.reason.indexOf('Please enter username') > -1) {
            let id = err.reason.replace('Please enter username ', '');
            let user = Meteor.users.findOne({_id: id});
          } else {
            toastr.error('Login failed: ' + err.reason);
          }
        } else {
          Router.go('inbox');
        }

      });
    }else{
      toastr.error("Please enter all information")
    }
  }
});