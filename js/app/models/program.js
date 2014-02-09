define(['backbone'], 
function () {
	return Backbone.Model.extend({

		parse: function(response, opt) {
			var date = response.scheduleItem.Date,
				time = response.scheduleItem.Time,
				newDateTime = new Date();

			date = date.substr(6,13);
			date = new Date(parseInt(date));

			time = time.substr(6,13);
			time = new Date(parseInt(time));

			// Corrected 1 day offset of the raw data
			newDateTime.setDate(date.getDate() + 1);
			newDateTime.setMonth(date.getMonth());
			newDateTime.setYear(date.getFullYear());

			//convert local time to TR time
			//????????????
			newDateTime.setHours(time.getHours() + (time.getTimezoneOffset() + 120 ) / 60 );
			newDateTime.setMinutes(time.getMinutes());
			newDateTime.setSeconds(time.getSeconds());

			return {
				date: newDateTime,
				title: response.scheduleItem.Title,
				description: response.scheduleItem.Description,
				url: response.url,
				img: response.img,
				text: response.text,
				season: response.Season,
				episode: response.Episode,
				imdb: response.imdb,
			}			

		},
	});
});