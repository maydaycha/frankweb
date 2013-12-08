<?php
// ini_set("display_errors", "On");
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$lat = $_POST["lat"];
$lng = $_POST["lng"];
// $lat = 25.128531;
// $lng = 121.751905;
$class = $_POST["class"];
// $class = 'clinic';
// $lat =  24.789071;
// $lng =  120.9996451;

$url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lng.'&sensor=false&language=zh-tw';
$get = file_get_contents($url);
$jsondecode = json_decode($get);
// echo json_encode($jsondecode,JSON_UNESCAPED_UNICODE);

for($j=0;$j<count($jsondecode->results[0]->address_components);$j++)
	if($jsondecode->results[0]->address_components[$j]->types[0]=="administrative_area_level_2"){
		$city = $jsondecode->results[0]->address_components[$j]->long_name;
		break;
	}
for($j=0;$j<count($jsondecode->results[0]->address_components);$j++)
	if($jsondecode->results[0]->address_components[$j]->types[0]=="locality"){
		$district = $jsondecode->results[0]->address_components[$j]->long_name;
		break;
	}

$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
$db->query("SELECT * FROM $class WHERE city LIKE '$city' AND district LIKE '$district'");


//print_r($result);
//	print_r($db->fetch_array());
// $result_array=array();
$result=array();
// $data = array();
$i = 0;
while($result[$i++] = $db->fetch_array());
//print_r($result);
 echo json_encode($result,JSON_UNESCAPED_UNICODE);	
// echo json_encode($result);	

	
?>
