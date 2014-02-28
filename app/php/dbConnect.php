<?php

$dbc = @mysqli_connect("localhost", "root", "root", "smartclinic");
mysqli_query($dbc, "set names utf8");
if (!$dbc) {
	die('Erreur de connexion : ' . mysqli_connect_error());
}
?>