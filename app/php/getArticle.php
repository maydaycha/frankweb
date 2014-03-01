<?php
require_once "dbConnect.php";
header("Content-Type:text/html; charset=utf-8");

$query = "SELECT * FROM article ORDER BY num DESC";
$result_array = array();
$result = mysqli_query($dbc, $query);
while ($main = mysqli_fetch_array($result, MYSQL_ASSOC)) {
	array_push($result_array, $main);
}
echo json_encode($result_array);	
?>