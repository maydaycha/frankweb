<?php

require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);


$argv = $_POST["argv"];
// $argv = "12";
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


// print_r($result);
echo json_encode($result);

?>