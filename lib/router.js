//This is the default template layout for our application ("layout.html")
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe("posts"); }
});

//This route (root) pulls in the postsList template located in post_list.html
//The Reason it finds the postsList template is because the route is named the same
//if the route was /postsList it would still work, but it's better to configure it then to leave it to chance
Router.route('/', {name: 'postsList'});
