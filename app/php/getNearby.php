<?php
require_once 'dbConnect.php';
header("Content-Type:text/html; charset=utf-8");
$lat = $_GET["lat"];
$lng = $_GET["lng"];
$class = $_GET["class"];
$range = $_GET["range"];

// $lat = 22.9872290802915;
// $lng = 120.2192409802915;

// $class = 'clinic';
// $class = 'hospital';
// $range = 0.5;

$lat_lowbound = $lat-$range;
$lat_upbound = $lat+$range;
$lng_lowbound = $lng-$range;
$lng_upbound = $lng+$range;

$query = "SELECT * FROM $class WHERE (lat BETWEEN '".$lat_lowbound."' AND '".$lat_upbound."') AND (lng BETWEEN '".$lng_lowbound."' AND '".$lng_upbound."') LIMIT 1000 ";
// echo $query;
$result = mysqli_query($dbc, $query);
$result_array = array();
while ($main = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	array_push($result_array, $main);
}
array_pop($result_array);
// echo json_encode($result_array, JSON_UNESCAPED_UNICODE);	
echo json_encode($result_array);	
?>
