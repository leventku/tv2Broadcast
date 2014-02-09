<?php 

require "config.php";

$user_id = isset($_GET['userId']) ? htmlspecialchars($_GET['userId']) : '';

// set to +0 because javaScript sends TR time zone timestamp
date_default_timezone_set("Etc/GMT+0");


// connect to db->yayinAkisi

// insert into notifications user_id, date of the desired program

try{

	$conn = new PDO(sprintf('mysql:host=%s; dbname=%s', $config["DB_HOST"], $config["DB_NAME"]), $config['DB_USER'], $config['DB_PASS']);

	//default error mode is ERRMODE_SILENT. so we need to manually feth the errors using functions:
	// $conn->errorCode();
	// $conn->errorInfo();
	//For development we change PDO::ATTR_ERRMODE to:
	// ERRMODE_EXCEPTION
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->prepare('SELECT program_date FROM notifications WHERE user_id = :user_id');
	$stmt->execute(array(
		'user_id'=> $user_id
	));

	$response = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		foreach ($row as $key => $value) {
			$value = (int) STRTOTIME($value) * 1000;
			array_push($response, $value );
		}
	}

	echo json_encode($response);

} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}

?>