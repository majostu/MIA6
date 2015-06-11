<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');

// Require the db class file
require("functions/BuurterDB.class.php");
	
// Instantiate the db classes
$favorites  		= 	new Favorites();
$comments  			= 	new Comments();   
$toilets  			= 	new Toilets();   
$users  			= 	new Users();


if ($_POST['slug'] == 'toilets' && isset($_POST) && !empty($_POST['slug']) && filter_input(INPUT_SERVER, 'HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest'){ 

	$toilets->id 			= 5;
	$toilets->toilet_id 	= 5;
	$toilets->device_id 	= "UUID-123456"; 
	$toilets->name 			= "Hallo"; 
	$toilets->address 		= "Wereld";   
	$toilets->latitude 		= 0; 
	$toilets->longitude 	= 0;             
	$toilets->timestamp	  	= date(1);
	$toilets->rating 		= 2;
	$toilets->type 			= 5;          

	$creation = $toilets->Create();
   
	if($creation) 
		echo "SQL geschreven\n FB id:".$toilets->id."\n titel:".$toilets->name;

	else
		echo "SQL schrijven mislukt";
	
} else {	
	echo "error";
}

?>
