//This is the default template layout for our application ("layout.html")
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe("posts"); }
});

//This route (root) pulls in the postsList template located in post_list.html
//The Reason it finds the postsList template is because the route is named the same
//if the route was /postsList it would still work, but it's better to configure it then to leave it to chance
Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id);}//if you don't include what to search on it defaults to _id
});


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
