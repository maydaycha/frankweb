<?php
require_once "dbConnect.php";
header("Content-Type:text/html; charset=utf-8");
$lat = $_POST["lat"];
$lng = $_POST["lng"];
// $lat = 25.047908;
// $lng = 121.517315;
// 25.047908,121.517315

$class = $_POST["class"];
// $class = 'clinic';

$url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lng.'&sensor=false&language=zh-tw';
$get = file_get_contents($url);
$jsondecode = json_decode($get);
// print_r($jsondecode);
for($j=0;$j<count($jsondecode->results[0]->address_components);$j++){
	if($jsondecode->results[0]->address_components[$j]->types[0]=="administrative_area_level_2"){
		$city = $jsondecode->results[0]->address_components[$j]->long_name;
		break;
	}
}

for($j=0;$j<count($jsondecode->results[0]->address_components);$j++){
	if($jsondecode->results[0]->address_components[$j]->types[0]=="locality"){
		$district = $jsondecode->results[0]->address_components[$j]->long_name;
		break;
	}
}

$query = "SELECT * FROM $class WHERE city = '$city' AND district = '$district'";
$result_array = array();
$result = mysqli_query($dbc, $query) or die("Error: query error");
while ($main = mysqli_fetch_array($result, MYSQL_ASSOC)){
	// print_r($main);
	array_push($result_array, $main);
}

 echo json_encode($result_array,JSON_UNESCAPED_UNICODE);	
// echo json_encode($result);	


?>
