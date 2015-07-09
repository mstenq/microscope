Posts = new Meteor.Collection("posts");

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames){
    //Makes sure you can only edit url and tile.
    //if the length of the fieldnames to edit is greater than 0 after stripping out allowed then return true, which means deny = true
    return (_.without(fieldNames, 'url', 'title').length >0);
  }
});


Meteor.methods({
  postInsert:function(postAttributes){
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    //CHECK FOR DUPLICATE URL
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }



    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
     return {
       _id: postId
     };
  }
});
