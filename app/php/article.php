<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
date_default_timezone_set('GMT');

$title = $_POST["title"];
$content = $_POST["content"];
$date = date("Y/m/d");

if($title==null || $content==null){
	echo 'No complete info';
	return;
}
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
// $db->query("SELECT * FROM $class WHERE city='$city'");
echo 'title: '.$title.'<br>';
echo 'content: '.$content.'<br>';
echo 'date: '.$date.'<br>';
$query = "INSERT INTO  `smartclinic`.`article` (`num` ,`title` ,`content` ,`date`) VALUES (NULL ,  '$title',  '$content',  '$date')";
$db->query($query);



?>