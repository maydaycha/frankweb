<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

function mbstringtoarray($str,$charset) { 
	$strlen=mb_strlen($str); 
	while($strlen){ 
		$array[]=mb_substr($str,0,1,$charset); 
		$str=mb_substr($str,1,$strlen,$charset); 
		$strlen=mb_strlen($str); 
	} 
	return $array;
} 

$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

$cityArray = ['臺東縣','金門縣','連江縣'];
// 前鎮區
foreach($cityArray as $value){
	$db->query("SELECT address FROM clinic WHERE city='$value' AND district=''");
	$result = array();
	$i=0;
	while($result[$i] = $db->fetch_array()){
		$y="";
		$bb = -1;
		$dis[$i][0] = $result[$i]['address'];
		$arr = mbstringtoarray($dis[$i][0], "utf-8");
		for($aa=3;$aa<sizeof($arr); $aa++){
			if($arr[$aa]=="區" || $arr[$aa]=="市" || $arr[$aa]=="鄉" ||  $arr[$aa]=="鎮" | $arr[$aa]=="里"){
				$bb = $aa;
				break;
			}
		}
		for($xxx=3; $xxx<=$bb; $xxx++)
			$y.=$arr[$xxx];

		$dis[$i][1] = $y;
	// echo $dis[$i][0].": ".$dis[$i][1];
	// $db->query("UPDATE hospital SET district='$y' WHERE address='$dis'");
	// print_r($arr);
		echo $y;
		echo "<br>";
		$i++;
	}
	for($a=0; $a<$i; $a++){
		$x = $dis[$a][0];
		$z = $dis[$a][1];
		$db->query("UPDATE clinic SET district='$z' WHERE address='$x'");
	}

}


// $db->query("INSERT INTO hospital('district') VALUES() ");






/*
$url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=25.041906400000002,121.6184735&sensor=false&language=zh-tw';
$get = file_get_contents($url);
$jsondecode = json_decode($get);
for($j=0;$j<count($jsondecode->results[0]->address_components);$j++)
	if($jsondecode->results[0]->address_components[$j]->types[0]=="administrative_area_level_2"){
		$city = $jsondecode->results[0]->address_components[$j]->long_name;
		break;
	}
//$db->query("SELECT * FROM hospital WHERE city='$city'");
echo "SELECT * FROM hospital WHERE city='$city'";

*/

/// insert LAT LNG to DB
/*
$db->query("SELECT * FROM hospital WHERE city='新北市' AND lat='0'");
$result_array=array();
$result=array();
$data = array();
$i = 0;
while($result[$i++] = $db->fetch_array());
//print_r($result);
//update DataBase
echo count($result).'<br>';
$j=1;
foreach($result as $key => $value){
  $addr = $result[$key]['address'];
  //echo $addr; 
  $url='http://maps.googleapis.com/maps/api/geocode/json?address='.$addr.'&sensor=false&language=zh-tw';
  $get = file_get_contents($url);
  $jsondecode = json_decode($get);
  if($jsondecode->status=="OK"){
	$lat = $jsondecode->results[0]->geometry->location->lat;
	$lng = $jsondecode->results[0]->geometry->location->lng;
	$db->query("UPDATE clinic SET lat='$lat',lng='$lng' WHERE address='$addr'");
	echo $j.':insert OK!<br>';
  }
  else{
	  
	  echo $j."(UPDATE clinic SET address='".$addr."' WHERE address='".$addr."');<br>";
  }
  $j++;
  
}
*/
?>

