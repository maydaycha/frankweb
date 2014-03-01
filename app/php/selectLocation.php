<?php
require_once("DB_config.php");
require_once("DB_class.php");
require_once "dbConnect.php";
header("Content-Type:text/html; charset=utf-8");


$city = $_POST["city"];
$district = $_POST["district"];
$classfication = $_POST["classfication"];
$depart = $_POST["depart"];

if($classfication =="clinic" && $depart != "all" ) {
	$depart = "%".$depart."%";
	$query_string = "SELECT * FROM $classfication WHERE city LIKE '$city' AND district LIKE '$district' AND name LIKE '$depart'";
} else {
	$query_string = "SELECT * FROM $classfication WHERE city LIKE '$city' AND district LIKE '$district'";
}


$result = mysqli_query($dbc, $query_string);
$result_array = array();
while ($main = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	array_push($result_array, $main);
}
echo json_encode($result_array);	
?>