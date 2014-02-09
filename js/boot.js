requirejs.config({
	baseUrl: 'js/lib',

	paths: {
		app: '../app',

		jquery: 'jquery-1.9.1.min',
		backbone: 'backbone-min',
		underscore: 'underscore-min',
		jqEasing: 'jquery.easing.1.3',
		facebook: ['//connect.facebook.net/en_US/all', 'fb-all']
	},

	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports:'Backbone'
		},
		jqEasing: {
			deps:['jquery']
		},
		facebook: {
			exports: 'FB'
		}
	}
});

require(['backbone',
		'app/app',
		'app/views/global',
		'app/router',
		'app/collections/programs'
], function (Backbone, App, GlobalView, Router, ProgramsCollection) {
	
	$(function() {
		App.initialize({
			globalView: new GlobalView,
			canvasHeight: 770,
            forceCanvas: false,
            appId: 549860408433685,
            pageId: 'pixijam'
		});

		Router.initialize();

		$.ajax({
			url: 'data/feed.php'
		});
	});

});