#TV2 Broadcast Stream App

This Backbone.js / RequireJS application fetches data as JSON from TV’s website and parses it to the screen as the present week’s TV guide. User can browse all the shows in the order of starting time in all-day view and today’s evening shows in prime-time view. This is also a facebook tab application where user can mark a show so that in the future just before it starts; he receives a notification reminding that.

#How to install...
After clonning the project find the "config.php" file inside "data" folder.

Change it as follows

	'DB_USER' => username to access your database
	'DB_PASS' => password to access your database
	'DB_HOST' => the address of your host (eg. "localhost")
	'DB_NAME' => the name of the database for this app (eg. "tv2")

inside the database create a table named "notifications" using the following mySQL code

	CREATE TABLE `notifications` (
		`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
		`user_id` INT(10) UNSIGNED NULL DEFAULT NULL,
		`program_date` TIMESTAMP NULL DEFAULT NULL,
		`program_title` TEXT NULL COLLATE 'utf8_bin',
		PRIMARY KEY (`id`)
	)

All rights reversed. Feb 2014. leventku