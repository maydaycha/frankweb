<?php

/*/ ---- UPDATE ---- //

mysql_to_json now executes the query inside of the class so you simply pass the query string to the class when
you set the query. Please make sure you have filtered the query strings before hand to protect yourself from 
injection as this class has no such features at this current time.

// ---- Update ---- /*/

//include the mysql_to_json class
include('mysql_to_json.class.php');

//Mysql stuff.
mysql_connect('localhost', 'root', 'loel');
mysql_select_db('prohostcp');

//create a query string to use
$query = 'SELECT * FROM employees';

//Now mysql_to_json supports many methods of getting from your query to the json output, I will show you 2 methods

/////////////////////////////////////
// METHOD 1 - Using constructor   //
///////////////////////////////////

//create a new instance of mysql_to_json$mtj = new mysql_to_json($query);

//show the json output
echo $mtj->get_json();

///////////////////////////////////////
// METHOD 2 - Using method chaining //
/////////////////////////////////////

//create a new blank instance of mysql_to_json
$mtj = new mysql_to_json();

//show the json output through method chain
echo $mtj->set_query($query)->set_cbfunc('loels')->get_json();

?>
