define([
		'backbone',
		'app/app',
		'app/views/share',
		'app/views/modeSwitch',
		'app/views/allDay',
		'app/views/PrimeTime',
], function ( Backbone, App, ShareView, ModeSwitchView, AllDayView, PrimeTimeView) {

	return Backbone.View.extend({
		el: document,
		events: {
			'click': 'gotAClick',
		},

		initialize: function() {
			console.log('GlobalView initialized');

			App.on('modechange', this.changeMod, this);

			App.on('reminderChange', this.reminderBtnHandler, this);

			App.on('savedReminders', this.arrangeSavedReminders, this);
		},

		render: function() {
			new ShareView;
			new ModeSwitchView;
			new AllDayView;
			new PrimeTimeView;
		},

		gotAClick: function(e) {
			var clickedEl = $(e.target);

			App.trigger('clickedToCancel', clickedEl);
		},

		changeMod: function(e) {
			var id = (e=='all-day') ? 'tum_gun' : 'prime_time';

			this.$('section')
				.removeClass('selected')
				.closest('#' + e).addClass('selected');

			this.$('a.tv2-logo').attr('href',
				( e == 'all-day' )
					? '#prime_time' 
					: '#tum_gun'
			);

			App.router.navigate(id, true);
		},

		reminderBtnHandler: function(data) {
			console.log('reminderBtnHandler',data);

			var $target = this.$('li')
				.find('a[data-date="' + data.date +'"]'),
				index;

			console.log($target);

			//data.title prop is null means reminder deleted
			if(data.title !== null) {
				$target.addClass('cancel-rm')
					.removeClass('reminder');

				App.savedDates.push(data.date);

			} else {
				$target.addClass('reminder')
					.removeClass('cancel-rm');

				index = App.savedDates.indexOf(data.date);

				App.savedDates.splice(index, 1);
				
			}
		},

		arrangeSavedReminders: function(datesArray) {
			if (datesArray.length) {

				for (var i = datesArray.length - 1; i >= 0; i--) {
					//if program is expired create falsey date
					var date = ( App.getCurrentTime() > new Date(datesArray[i]) )
						? ''
						: datesArray[i];

					this.$('li')
						.find('a[data-date="' + date +'"]')
							.addClass('cancel-rm')
							.removeClass('reminder');
				};
			};
		},
	});
});