define([
		'backbone', 'jqEasing'
], function (Backbone) {
	var ShareView = Backbone.View.extend({
		el: 'div.share',

		events: {
			'mouseenter': 'toggleShareIcons',
			'mouseleave': 'toggleShareIcons'
		},

		toggleShareIcons: function() {
			var right;

			if ( !this.$el.hasClass('activated') ) {
				right = 70;
				this.$el.addClass('activated');
			} else {
				right = 0;
				this.$el.removeClass('activated') 
			};

			this.$('li')
				.stop(true, true)
				.each(function (index, element) {
				$(this).animate({
					right: right
				},{
					duration: 500,
					easing: 'easeOutBack',
					complete: function() {
					}
				});
					right ? right += 70 : right = 0;
			});
		},
	});
	
	return ShareView;
});