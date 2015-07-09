Posts = new Meteor.Collection("posts");

Posts.allow({
  update: function(userId, post){
    return ownsDocument(userId, post); //Located in lib/permissions.js
  },
  remove: function(){
    return ownsDocument(userId, post); //Located in lib/permissions.js
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
