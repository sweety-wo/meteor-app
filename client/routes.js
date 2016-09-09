Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
OnBeforeActions = {
	loginRequired: function(pause) {
		if (!Meteor.userId()) {
			this.redirect('/');
		}else {
			this.next();
		}
	},
	loginNotRequired: function(pause) {
		if (Meteor.userId()) {
			this.redirect('inbox');
		}
		else{
			this.next();
		}
	}
};
Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['inbox', 'drafts','sentMail','newMessage']
});
Router.onBeforeAction(OnBeforeActions.loginNotRequired, {
	only: ['/', 'signUp']
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

Router.route('inbox/:username/:_id', function () {
	this.render('messageView',{
		to: "main",
		data: function() {
			return {
				username: this.params.username,
				_id: this.params._id
			}
		}
	});
});

Router.route('sentMail', function () {
	name: "sentMail",
		this.render('sentMail',{
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
