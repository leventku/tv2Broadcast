<?php 
$feed_url = 'http://www.tv2.com.tr/servis/yayinakisi';
$file_path = '../servis/yayinakisi';
$file_time = filemtime($file_path);
$execution_time = time();
$one_day_of_seconds = 24*60*60;

if ($execution_time - $file_time > $one_day_of_seconds) {

	$content = file_get_contents($feed_url);

	file_put_contents($file_path, $content);

	echo '<h1>yayinakisi is updated!</h1>';

} else {
	echo '<h1>yayinakisi is NOT updated!</h1>';
	echo '<h2>it will be updated if 1 day is passed after modification date</h2>';

}

?>