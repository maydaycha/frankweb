<?php

require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);


$argv = $_POST["argv"];
// $argv = "123";

$lat = $_POST["lat"];
$lng = $_POST["lng"];
// $lat = 24.7911879;
// $lng = 121.00524;

$result_array=array();
$result=array();
$query_string = "SELECT * FROM clinic WHERE name LIKE '%$argv%'";
$db->query($query_string);
$i = 0;

while($result[$i] = $db->fetch_array()){
	if($result[$i]!=null)
		$i++;
};
if(count($result)==1)
	$i = 0;

$query_string = "SELECT * FROM hospital WHERE name LIKE '%$argv%'";
$db->query($query_string);
while($result[$i] = $db->fetch_array()){
	if($result[$i]!=null)
		$i++;
};
if(count($result)==1)
	$i = 0;


$query_string = "SELECT * FROM clinic WHERE address LIKE '%$argv%'";
$db->query($query_string);
while($result[$i] = $db->fetch_array()){
	if($result[$i]!=null)
		$i++;
};
if(count($result)==1)
	$i = 0;


$query_string = "SELECT * FROM hospital WHERE address LIKE '%$argv%'";
$db->query($query_string);
while($result[$i] = $db->fetch_array()){
	if($result[$i]!=null)
		$i++;
};
if(count($result)==1)
	$i = 0;


$distance_array = array();
/*  compute distance */
for($i = 0; $i < count($result); $i++)
{
	$dis_temp = sqrt(pow(($lat - $result[$i]['lat']),2) + pow(($lng - $result[$i]['lng']), 2));
	$distance[$i] = $dis_temp;
}
/*  compute distance */

$dist_init = $distance;

/* sort by value */
sort($distance);

$final_output = array();

/* maping */ 
for($i=0; $i<count($distance);$i++){
	for($j=0; $j<count($distance);$j++){
		if($distance[$i] == $dist_init[$j])
		{
			$final_output[$i] = $result[$j];
			break;
		}
	}
}

echo json_encode($final_output);
// print_r($final_output);
// echo json_encode($final_output, JSON_UNESCAPED_UNICODE);

?>