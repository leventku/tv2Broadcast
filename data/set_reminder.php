<?php 

require "config.php";

$user_id = isset($_GET['userId']) ? htmlspecialchars($_GET['userId']) : '';

// set to +0 because javaScript sends TR time zone timestamp
date_default_timezone_set("Etc/GMT+0");

$program_title = isset($_GET['title']) ? htmlspecialchars($_GET['title']) : '';

$incoming_date = isset($_GET['date']) ? htmlspecialchars($_GET['date']) : '';
//convert js to php timestap: erase 000 at the end
$incoming_date = substr($incoming_date, 0, 10);

//convert to below format for SQL to parse correctly
$program_date = date('Y-m-d H:i:s', $incoming_date);

try{

	$conn = new PDO(sprintf('mysql:host=%s; dbname=%s', $config["DB_HOST"], $config["DB_NAME"]), $config['DB_USER'], $config['DB_PASS']);

	//default error mode is ERRMODE_SILENT. so we need to manually feth the errors using functions:
	// $conn->errorCode();
	// $conn->errorInfo();
	//For development we change PDO::ATTR_ERRMODE to:
	// ERRMODE_EXCEPTION
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->prepare('INSERT INTO notifications VALUES(null, :user_id, :program_date, :program_title)');
	$stmt->execute(array(
		'user_id'=> $user_id,
		'program_title'=> $program_title,
		'program_date'=> $program_date
	));

} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}

?>