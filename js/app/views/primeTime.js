define([
		'backbone',
		'app/app'
], function (Backbone, App) {
		
	return Backbone.View.extend({
		el: '#prime-time',
		events: {
			'mouseenter ul.programs>li': 'zoomInProgram',
			'mouseleave ul.programs>li': 'zoomOutProgram',
			'click ul.programs menu a': 'sharePopUp',
			'click ul.programs li a.reminder': 'remindProgram',
			'click ul.programs li a.cancel-rm': 'unRemindProgram'
		},

		initialize: function() {
			console.log('PrimeTimeView initialized');

			this.render();

			// App.on('reminderChange', this.reminderBtnHandler, this);

			// App.on('savedReminders', this.arrangeSavedReminders, this);
		},

		render: function() {
			//refresh h2 as today's date
			this.refreshHeadingDate();

			//populate programs
			this.populatePrograms();
		},

		populatePrograms: function() {
			//get programs by today.time > 16:59 && time <= 23:59
			var start = App.getCurrentTime(),
				end = App.getCurrentTime(),
				$ul = this.$('ul.programs'),
				primeTimeProgs, tempObj;

			start.setHours(16);
			start.setMinutes(59);

			end.setHours(23);
			end.setMinutes(59);

			primeTimeProgs = this.getProgramsByTimeSpan(start, end);

			//empty ul.programs
			$ul.empty();

			_.each(primeTimeProgs, function(program, key) {
				$ul.append( this.addOne(program) );
			}, this);

		},

		addOne: function(program) {
			var img = program.get('img').replace('-222x156-', '-200x100-'),
				url = program.get('url'),
				title = program.get('title'),
				date = program.get('date'),
				imdb = program.get('imdb'),
				hours = program.get('date').getHours(),
				minutes = program.get('date').getMinutes(),
				timeFormatted = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2),
				expired = App.getCurrentTime() > date
					? 'expired' : '',
				contentObj = {
					img: img,
					url: url,
					title: title,
					imdb: imdb,
					imdbStyle: imdb ? '' : 'visibility: hidden',
					timeFormatted: timeFormatted,
					expired: expired,
					date: Date.parse(date)
				},
				html = App.buildTemplate('prime-time-prog', contentObj);

			return html;
		},

		refreshHeadingDate: function() {
			var today = App.getCurrentTime(),
				date = today.getDate(),
				monthName = App.getMonthTrName( today ),
				dayName = App.getDayTrName( today );

			this.$el
				.children('h2')
				.html(date + ' ' + monthName + ' ' + dayName);
		},

		getProgramsByTimeSpan: function(start, end) {
			var first = App.programs.filter(function(program) {
				return (program.get('date') > start);
			}),
				second = first.filter(function(program) {
					return (program.get('date') <= end);
				});

			return second;
		},

		zoomInProgram: function(e) {
			var $el = $(e.currentTarget) //li
				.children('a')
				.first()
					.addClass('selected')
					.stop()
					.animate({
						height: 220,
						lineHeight: 220
					}, 300),

				bigImgUrl = $el.css('background-image').replace('-200x100-', '-810x0-');
					
			$el.css('background-image', bigImgUrl);
		},

		zoomOutProgram: function(e) {
			var $el = $(e.currentTarget)
				.children('a')
				.eq(0)
					.removeClass('selected')
					.stop()
					.animate({
						height: 100,
						lineHeight: 100,
					}, 300),

				smallImgUrl = $el.css('background-image').replace('-810x0-', '-200x100-');
					
			$el.css('background-image', smallImgUrl);
		},

		sharePopUp: function(e) {
			App.sharePopUp(e);
		},

		remindProgram: function(e) {
			e.preventDefault();

			App.remindProgram(e);
		},

		unRemindProgram: function(e) {
			e.preventDefault();

			App.unRemindProgram(e);
		},

		// reminderBtnHandler: function(data) {
		// 	App.reminderBtnHandler(data);
		// },
	});
});