Meteor.publish('friend', function() {
  var currentUser = Meteor.users.findOne(this.userId);
  if(currentUser) {
    return Friend.find({createdBy: currentUser.username});
  }
});
