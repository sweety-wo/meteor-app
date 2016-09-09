Meteor.publish('friend', function() {
  return Friend.find();
})