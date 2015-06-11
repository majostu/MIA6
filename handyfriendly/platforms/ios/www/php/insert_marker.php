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

if (isset($_POST['slug']) && $_POST['slug'] == 'toilets'){ 

	if($_POST['slug'] == 'toilets'){

		$toilets->device_id 	= $_POST["device_id"];
		$toilets->name 			= $_POST["name"];
		$toilets->address 		= $_POST["address"];  
		$toilets->latitude 		= $_POST["latitude"];
		$toilets->longitude 	= $_POST["longitude"];            
		$toilets->timestamp	  	= date('Y-m-d H:i:s');
		$toilets->rating 		= $_POST["rating"]; 
		$toilets->type	  		= 2;
         	
		$creation = $toilets->Create();
			
		if($creation) { 
			echo "SQL profile geschreven";

			
			/*$host = "mysql689int.cp.hostnet.nl";
			$user  = "u58204_mia";
			$password =  "mias6";
			$database = "db58204_mia";
			 
			try {
			    // Establish server connection and select database
			    $dbh = new PDO("mysql:host=$host;dbname=$database", $user, $password);
			    // run query to insert a record
			    $dbh->query("SELECT * FROM toilets");
			    echo "ID of the last inserted record is: ". $dbh->lastInsertId();
			}catch(PDOException $e){
			    die('Could not connect to the database:' . $e);
			}*/
			
			
	
		} else {
			echo "SQL profile schrijven mislukt";
		}
				
	}
	
} else if (isset($_POST['slug']) && $_POST['slug'] == 'saveRateComment'){
	
	if($_POST['slug'] == 'saveRateComment'){ 
		
		$comments->toilet_id 			= $_POST["toilet_id"]; 
		$comments->device_id			= $_POST["device_id"]; 
		$comments->device_name			= $_POST["device_name"];
		$comments->rating				= $_POST["rating"];
		$comments->comment				= $_POST["comment"];       
	     	
		$creation = $comments->Create();
	   
		if($creation) { 
			echo "SQL comment geschreven";
	
		} else {
			echo "SQL comment schrijven mislukt";
		}
	
	}
	
} else if (isset($_POST['slug']) && $_POST['slug'] == 'comments'){ 

	if($_POST['slug'] == 'comments'){
		
		$comments->toilet_id 	= $_POST["toilet_id"];
		$comments->device_id 	= $_POST["device_id"];
		$comments->device_name 	= $_POST["device_name"];
		$comments->comment		= $_POST["comment"]; 
		$comments->rating		= $_POST["rating"];            
		$comments->timestamp	= date('Y-m-d H:i:s');
         	
		$creation = $comments->Create();
	   
		if($creation) { 
			echo "SQL comment geschreven";
	
		} else {
			echo "SQL comment schrijven mislukt";
		}
		
	}
} else if (isset($_POST['slug']) && $_POST['slug'] == 'updateRating'){ 

	if($_POST['slug'] == 'updateRating'){
								
		$toilets->id 			= $_POST['toilet_id'];	
		$toilets->rating		= $_POST["rating"];         
         	
		$creation = $toilets->Save();
	   
		if($creation) { 
			echo "SQL update geschreven";
	
		} else {
			echo "SQL update schrijven mislukt";
		}
		
	}
} else {
	echo "error";
}

 


?>
