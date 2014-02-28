<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

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



$db->query($query_string);
$result=array();
$data = array();
$i = 0;
while($result[$i++] = $db->fetch_array());
echo json_encode($result);	
?>