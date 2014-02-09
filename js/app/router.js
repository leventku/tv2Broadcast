define([
		'backbone',
		'app/app'
], function (Backbone, App) {	
	return {
		initialize: function () {
			var Router = Backbone.Router.extend({
				routes: {
					'': 'index',
					// 'all-day': 'allDay',
					// 'prime-time': 'primeTime'
					'tum_gun': 'allDay',
					'prime_time': 'primeTime'
				},

				index: function() {
					console.log('Hello from index page');
				},

				allDay: function() {
					App.trigger('modechange', 'all-day');
				},

				primeTime: function() {
					App.trigger('modechange', 'prime-time');
				}
			});

			App.router = new Router;
			Backbone.history.start();
		}
	}
});