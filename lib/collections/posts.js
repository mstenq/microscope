Posts = new Meteor.Collection("posts");

Posts.Collection.allow({
  insert: function(userId, doc){
    return !! userId; 
  }
});
