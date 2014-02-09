define([
		'backbone',
		'app/app'
], function (Backbone, App) {
	var AllDayView = Backbone.View.extend({
		el: '#all-day',
		events: {
			'click ul.hours a': 'goToProgram',
			'click ul.week a': 'goToProgram',
			'click li.ribbon a.shareBtn': 'sharePopUp',
			'click li.ribbon a.reminder': 'remindProgram',
			'click li.ribbon a.cancel-rm': 'unRemindProgram',
			'click div.when': 'checkNotification',
		},

		hoursBar: this.$('ul.hours'),
		ribbonDate: App.getCurrentTime().getDate(),

		initialize: function() {
			console.log('AllDayView initialized');

			this.render();
		},

		render: function() {
			this.showCalendar( App.getCurrentTime() );

			this.markTodayInCalendar();

			this.createHours();

			this.showProgram( this.getProgramByTime( App.getCurrentTime() ) );

		},

		markTodayInCalendar: function() {
			var todayIndex = App.getDayIndex(App.getCurrentTime());

			this.$('ul.week')
				.find('li')
				.eq(todayIndex)
					.find('a')
						.css('color', '#424242');

		},

		showCalendar: function(dateToShow) {
			var todayDate = dateToShow.getDate(),
				todayMonthName = App.getMonthTrName( dateToShow ),
				todayOfWeekId = App.getDayIndex(dateToShow);

			this.$('nav')
				.find('.day-nr')
					.html( todayDate )

					.siblings('.month-name')
						.html( todayMonthName )
						.end().end()
					
					.find('.week')
						.children('li')
							.eq( todayOfWeekId )
							.addClass('selected')

						.siblings()
							.removeClass('selected');
		},

		createHours: function() {
			var self = this,
				$li = $('<li>'),
				currentProgram = this.getProgramByTime(App.getCurrentTime()),
				currentProgramIndex = App.programs.indexOf(currentProgram),
				hours, minutes;

			// $ul = this.$('ul.hours').empty()
			this.hoursBar.empty();

			App.programs.each(function(model) {
				// convert time strings to 2 digit format
				hours = ('0' + model.get('date').getHours()).slice(-2),
				minutes = ('0' + model.get('date').getMinutes()).slice(-2),
				index = App.programs.indexOf(model);

				$li.clone().html('<a href="#" data-index="' + index + '">' + hours + ':' + minutes)
					.appendTo(self.hoursBar);
			});

			// center and mark current program			
			this.centerHours(currentProgramIndex);
		},

		centerHours: function(index) {
			this.hoursBar.animate({marginLeft: -80 * index + 265}, 400)
				.children('li')
					.eq(index)
					.addClass('selected')

					.siblings()
						.removeClass('selected');
		},

		getProgramByTime: function(time) {
			var nextProg = App.programs.find( function(program) {
				return program.get('date') > time;
			}),
				nextProgIndex = App.programs.indexOf(nextProg),
				currentProgIndex = nextProgIndex - 1,
				currentProg = App.programs.at(currentProgIndex) || App.programs.last();

			return currentProg;
		},

		showProgram: function(program) {
			var title = program.get('title'),
				date = program.get('date'),
				img = program.get('img').replace('-222x156-', '-610x0-'),
					//generate w=610px jpg
				imdb = program.get('imdb'),
				url = program.get('url'),
				text = program.get('text'),
				dayName = App.getDayTrName(date),
				hours = date.getHours(),
				minutes = date.getMinutes(),
				expired = App.getCurrentTime() > date
					? 'expired' : '',
				formattedTime,contentObj, html, newArticle;

			formattedTime = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);

			contentObj = {
				title: title,
				img: img,
				url: url,
				dayName: dayName, //from date
				formattedTime: formattedTime,// from date
				imdb: imdb,
				text: text,
				date: Date.parse(date), //convert date to js timestamp
				expired: expired
			};

			html = App.buildTemplate('articleContent', contentObj);

			this.$('article').remove();
			newArticle = this.$('nav').after(html);

			if (imdb.length == 0) {
				this.$('a[data-role=imdb]').remove();
			};

			// Change big date if user selects via hours
			if (date.getDate() != this.ribbonDate) {
				this.ribbonDate = date.getDate();
				this.showCalendar(date);
			};
			//If there are saved reminder, indicate it
			(App.savedDates && !expired) && this.arrangeSavedReminders(App.savedDates);

		},

		goToProgram: function(e) {
			var $targetEl = $(e.target),
				programIndex = $targetEl.data('index'),
				program = App.programs.at(programIndex),
				currentTime = App.getCurrentTime(),
				currentDayIndex =  App.getDayIndex( currentTime ),
				selectedDayIndex, selectedProgram, selectedProgramOffset, selectedProgramIndex;

			e.preventDefault();

			// if clicked on a hour
			if (programIndex !== undefined) {
				this.showProgram(program);

				this.centerHours(programIndex);
			
			//if clicked on a day of week
			} else {
				selectedDayIndex = $targetEl //a
					.closest('ul.week') //ul
						.children('li') //li
							.index( $targetEl.parent() );

				selectedProgramOffset = currentDayIndex - selectedDayIndex;

				selectedProgram = this.getProgramByTime(
					currentTime.setDate( currentTime.getDate() - selectedProgramOffset )
					);

				selectedProgramIndex = App.programs.indexOf(selectedProgram);

				this.showProgram(selectedProgram);

				this.centerHours(selectedProgramIndex);
			};
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

		arrangeSavedReminders: function(datesArray) {
			if (datesArray.length) {

				for (var i = datesArray.length - 1; i >= 0; i--) {
					//if program is expired create falsey date
					var date = ( App.getCurrentTime() > new Date(datesArray[i]) )
						? ''
						: datesArray[i];

					this.$('li.ribbon')
						.find('a[data-date="' + date +'"]')
							.addClass('cancel-rm')
							.removeClass('reminder');
				};
			};
		},

		//preliminary method imitating server 5min checks
		checkNotification: function(e) {
			console.log('checkNotification');
			$.ajax({
				method: 'GET',
				url: 'data/notify.php'
			});
		},
	});
	
	return AllDayView;
});