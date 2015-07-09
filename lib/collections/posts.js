Posts = new Meteor.Collection("posts");

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
      userID: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
     return {
       _id: postId
     };
  }
});
