Meteor.publish('friend', function() {
  let currentUser = Meteor.users.findOne(this.userId);
  if(currentUser) {
    return Friend.find({createdBy: currentUser.username});
  }
});
