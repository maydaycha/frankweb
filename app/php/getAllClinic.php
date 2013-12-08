<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

// $city = $_POST["city"];
$city = "台北市";
$query_string="SELECT * FROM clinic WHERE city LIKE '$city'";
$db->query($query_string);
$result_array=array();
$result=array();
$i = 0;
while($result[$i++] = $db->fetch_array());
print_r($result);
// echo json_encode($result);	
?>