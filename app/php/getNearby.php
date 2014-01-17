<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$lat = $_POST["lat"];
$lng = $_POST["lng"];
$class = $_POST["class"];

// $lat = 22.9872290802915;
// $lng = 120.2192409802915;

// $class = 'clinic';
// $class = 'hospital';

$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
//取附近20公里的
//1度 = 111KM,  20km = 0.2度
$lat_lowbound = $lat-0.03;
$lat_upbound = $lat+0.03;
$lng_lowbound = $lng-0.03;
$lng_upbound = $lng+0.03;

$db->query("SELECT * FROM $class WHERE (lat BETWEEN '".$lat_lowbound."' AND '".$lat_upbound."') AND (lng BETWEEN '".$lng_lowbound."' AND '".$lng_upbound."') ");


$result=array();
$i = 0;
while($result[$i++] = $db->fetch_array());
array_pop($result);
// echo json_encode($result,JSON_UNESCAPED_UNICODE);	
echo json_encode($result);	
?>
