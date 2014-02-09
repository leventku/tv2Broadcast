define([
		'backbone',
		'app/models/program',
], function (Backbone, ProgramModel) {

	return Backbone.Collection.extend({
		model: ProgramModel,
		// online source
		// url: 'http://www.tv2.com.tr/servis/yayinakisi',

		// online source2
		// url: 'http://kongistanbul.com/test/yayin/data/feed.php',

		// http://dev.kong.tv2yayin/ source
		url: '../servis/yayinakisi',

		// online source via feed.php
		// url: '../data/feed.php',

		// localhost/YayinAkisi source
		// url: '../YayinAkisi/servis/yayinakisi',

		comparator: 'date',

	});
});