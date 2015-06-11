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
		
		/*$users->added_id 				= $_POST["added_id"]; 
		$users->device_id				= $_POST["device_id"]; 
		$users->device_name				= $_POST["device_name"];
      	     	
		$creation = $users->Create();
	   
		if($creation) { 
			echo "SQL user geschreven";
	
		} else {
			echo "SQL user schrijven mislukt";
		}*/
	
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
} else if (isset($_POST['slug']) && $_POST['slug'] == 'saveFavoriteMarker'){
	
	if($_POST['slug'] == 'saveFavoriteMarker'){ 
		
		$favorites->favorite_id 			= $_POST["favorite_id"]; 
		$favorites->device_id				= $_POST["device_id"]; 
		$favorites->device_name				= $_POST["device_name"];
      	     	
		$creation = $favorites->Create();
	   
		if($creation) { 
			echo "SQL favorite geschreven";
	
		} else {
			echo "SQL favorite schrijven mislukt";
		}
			
	}
	
} else {
	echo "error";
}

 


?>
