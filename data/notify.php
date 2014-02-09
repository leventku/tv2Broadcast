<?php 
// Send notification via facebook

require_once "facebook-php-sdk/facebook.php";
require 'config.php';

$FBconfig = array(
      'appId' => '549860408433685',
      'secret' => '8ce8cc494e3768729aaad77ad7f1bb3e',
      'fileUpload' => false, // optional
      'allowSignedRequest' => true, // optional, but should be set to false for non-canvas apps
  );

$facebook = new Facebook($FBconfig);

try{

	$conn = new PDO(sprintf('mysql:host=%s; dbname=%s', $config["DB_HOST"], $config["DB_NAME"]), $config['DB_USER'], $config['DB_PASS']);

	//default error mode is ERRMODE_SILENT. so we need to manually feth the errors using functions:
	// $conn->errorCode();
	// $conn->errorInfo();
	//For development we change PDO::ATTR_ERRMODE to:
	// ERRMODE_EXCEPTION
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	// ()NOW + INTERVAL 2 HOUR made local server as TR time
	$stmt = $conn->prepare('SELECT user_id, program_title FROM notifications WHERE program_date > NOW()+ INTERVAL 2 HOUR');
	// $stmt = $conn->prepare('SELECT user_id, program_title FROM notifications WHERE program_date > NOW()+ INTERVAL 2 HOUR AND program_date < NOW() + INTERVAL 2 HOUR + INTERVAL 5 MINUTE');
	$stmt->execute();

	while ( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
		print_r($row);

		// get the first element of the returned array
		$user_id = array_values($row)[0];

		$title = array_values($row)[1];

		$app_id = '549860408433685';

		$app_secret = '8ce8cc494e3768729aaad77ad7f1bb3e';

		$app_access_token = $app_id . '|' . $app_secret;

		$facebook->api( '/' . $user_id .'/notifications', 'POST', array(

		    'template' => 'tv2\'de "' . $title . '" adli program baslamak uzere...',

		    'href' => '', // RELATIVE URL

		    'access_token' => $app_access_token
		) );   
	}

} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}

?>