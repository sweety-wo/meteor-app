Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
	name: "login",
		this.render('login',{
			to: "main"
		});
});
Router.route('signUp', function () {
	name: "signUp",
		this.render('signUp',{
			to: "main"
		});
});

Router.route('inbox', function () {
	name: "inbox",
		this.render('inbox',{
			to: "main"
		});
});

Router.route('sent', function () {
	name: "sent",
		this.render('sent',{
			to: "main"
		});
});

Router.route('drafts', function () {
	name: "drafts",
		this.render('drafts',{
			to: "main"
		});
});

Router.route('newMessage', function () {
	name: "newMessage",
		this.render('newMessage',{
			to: "main"
		});
});
/*
MainController = RouteController.extend({
  action: function() {
  	this.render('home', {
	    data: function () {
	      return { posts: ['post red', 'post blue'] }
	    }
  	});
  }
});*/
