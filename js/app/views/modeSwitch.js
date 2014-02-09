define([
		'backbone',
		'app/app',
], function (Backbone, App) {
	var ModeSwitchView = Backbone.View.extend({
		el: 'nav.modes',

		events: {
			'click': 'show'
		},

		initialize: function() {
			this.entered = false;

			// close the switch if clicked elsewhere
			App.on('clickedToCancel', this.close, this);
			
			// if mode changes by other way change the swtc
			App.on('modechange', this.changeSwitch, this);
		},

		show: function(e) {
			e.preventDefault();


			if (this.entered == false) {
				this.$('a').addClass('show');
				
				this.entered = true;
			} 

			else if (this.entered == true) {
				var selectedMode = $(e.target)
					.closest('a')
					.data('mode'),

					route = (selectedMode =='all-day') 
						? 'tum_gun' 
						: 'prime_time';

				App.trigger('modechange', selectedMode);

				this.entered = false;

				App.router.navigate(route, true);
			}; 
		},

		changeSwitch: function(newMode) {
			this.$('a')
				.removeClass('show selected')
				.each(function() {
					var $this = $(this);
					
					$this.data('mode') == newMode
						&& $this.addClass('show selected');
				});
		},

		close: function(clickedElement) {
			//clicked element will be filtered
			if (!clickedElement.is('nav span') ) {
				this.$('a.selected').siblings().removeClass('show');

				this.entered = false;
			};
		},
	});
	
	return ModeSwitchView;
});