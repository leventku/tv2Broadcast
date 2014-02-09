define([
		'backbone',
		'app/collections/programs',
		'facebook'
		],
function (	Backbone,
			ProgramsCollection) 
{
	return _.extend({

		globalView: {},
		router: {},
		// Main collection
		programs: {},

		initialize: function (options) {
			var self = this;

			// Extend App namespace with passed options
			_.extend(this, options);

			this.programs = new ProgramsCollection();

			this.programs.fetch().then(function() {
				console.log('data fetched');

				// parse this week's data only
				self.programs = self.parseCurrentWeek();

				self.programs.sort();

				self.globalView.render();
			});

			// Support Handelebars style template delimeters
			_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

			console.log('App initialized...');

			// Redirect to Facebook tab if loaded directly on desktop
			var isTouchscreen = ('ontouchend' in document.documentElement);

			if (this.forceCanvas && !this.isTabbed() && !isTouchscreen) {
				window.location = this.getFBTabURI();
			}

			// Initiliase Facebook SDK
			//Pass App object to facebook via 'this'
			this.facebook.initialize(this, this.appId, this.canvasHeight );
		},

		getDayIndex: function(dateToConvert) {
			return (dateToConvert.getDay() + 6) % 7;
		},

		getDayTrName: function(date) {
			daysArr = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

			return daysArr[ date.getDay() ];
		},

		getMonthTrName: function(date) {
			var monthsArr = [ 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ];
			
			return monthsArr[ date.getMonth() ];
		},

		//synchronize to TR time
		getCurrentTime: function() {
			var curr = new Date,
				correctedTime = curr.setHours( 
					curr.getHours() +
					(curr.getTimezoneOffset() + 120 ) / 60 );

			return new Date(correctedTime);
		},

		parseCurrentWeek: function() {
			var self = this,
				filteredCollection = new Backbone.Collection(
					this.programs.filter( function(program) {
						
						var today = self.getCurrentTime(),
							first = today.getDate() - self.getDayIndex(today),
							last = first + 6,
							firstDay = new Date(today.setDate(first)),
							lastDay = new Date(today.setDate(last)); 

						firstDay.setHours(0);
						firstDay.setMinutes(0);
						firstDay.setSeconds(0);

						lastDay.setHours(23);
						lastDay.setMinutes(59);
						lastDay.setSeconds(59);

						return (program.get('date') >= firstDay && program.get('date') <= lastDay);
				}));

			filteredCollection.comparator = 'date';

			return filteredCollection;
		},

		buildTemplate: function(id, json) {
			return _.template( document.getElementById(id).innerHTML )(json);
		},

		sharePopUp: function(e) {
			var link = e.target; //anchor element

			if ($(link).data('role') === 'imdb') return true;

			e.preventDefault();

			window.open(link.href, "sharer", "status = 0, height = 260, width = 510, resizable = 0")
		},

		remindProgram: function(e) {
			if ( $(e.currentTarget).hasClass('expired') ) return;

			//check if user logged in our FB app before
			if (this.facebook.userStatus ) {
				this.handleReminder(e, 'save');
			} else { 
				//else let him login
				FB.login(function(response) {
				    if (response.authResponse) {
				        // The person logged into your app
						this.handleReminder(e, 'save');
				    }
				});
			}
		},

		unRemindProgram: function(e) {
			if (this.facebook.userStatus) {
				this.handleReminder(e, 'delete');
			}
		},

		handleReminder: function(e, action) {
			var self = this,
				$target = $(e.currentTarget),
				fbUserId = this.facebook.userId,
				data = {
					userId: fbUserId,
					date: $target.data('date'),
					title: $target.data('title')
				},
				url = 'data/set_reminder.php';

			if (action === 'delete') {
				url = 'data/unset_reminder.php',
				data.title = null;

				console.log('unRemindProgram');
			};

			$.ajax({
				method: 'GET',
				url: url,
				data: $.param(data), //serialize object
				success: function() {
					_.extend(data, {targetEl: $target})
					self.trigger('reminderChange', data);
				}
			});
		},

		restoreReminders: function(userId) {
			var self = this;

			$.ajax({
				method: 'GET',
				dataType: 'json',
				url: 'data/check_reminders.php',
				data: 'userId=' + userId,
				success: function(response) {
					self.trigger('savedReminders', response);
					self.savedDates = response;
				}
			});
		},

		facebook: {
			userStatus: false,
			userId: -1,

			initialize: function(App, appId, canvasHeight) {
				var self = this;

				FB.init({
				   appId: appId,
				   status: true, // Check Facebook Login status
				   cookie: true, // enable cookies to allow the server to access the session
	      		xfbml: false // Look for social plugins on the page
				});

				FB.Canvas.setSize({ width: 810, height: canvasHeight });

				FB.Event.subscribe('auth.authResponseChange', function(response) {
					if (response.status === 'connected') {
					    // The response object is returned with a status field that lets the app know the current
					    // login status of the person. In this case, we're handling the situation where they 
					    // have logged in to the app.
					    self.userStatus = true;

					    self.testAPI(App);

					} else if (response.status === 'not_authorized') {
					    // In this case, the person is logged into Facebook, but not into the app
					} else {
					    // In this case, the person is not logged into Facebook
					}
				});
			},

			testAPI: function(App) {
				var self = this;

				console.log('User logged in to FB app!');

				FB.api('/me', function(response) {
					self.userId = response.id;
					App.restoreReminders(self.userId);
				});
			},
		}
	}, Backbone.Events);
});