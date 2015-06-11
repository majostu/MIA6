<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');

// Require the db class file
require("functions/BuurterDB.class.php");
	
// Instantiate the db classes
$favorites  		= 	new Favorites();
$comments  		= 	new Comments();   
$toilets  		= 	new Toilets();   
$users  			= 	new Users();

$data = $toilets->all();
echo json_encode($data, JSON_NUMERIC_CHECK);

/*if (
	$_POST['slug'] == 'activities' //Check if ajax does post and if it is activities
	&& isset($_POST) 
	&& !empty($_POST['slug']) 
	&& filter_input(INPUT_SERVER, 'HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest'
){ 

// Create acitvity
   $activities->fb_id 			= "123456";
   $activities->activity_id  	= "123454";
   $activities->title		  	= "titel";
   $activities->description	  	= "omschrijving";  
   $activities->latitude	  	= "00";     
   $activities->longitude	  	= "00000";       
   $activities->age_range	  	= "1";       
   $activities->timestamp	  	= date(1);       
   $activities->fb_co_id	  	= "1234";  


   $creation = $activities->Create(); //Insert into db mattie G
   
   if($creation) 
		echo "SQL geschreven\n FB id:".$activities->fb_id."\n titel:".$activities->title;

   else
		echo "SQL schrijven mislukt";
	
} else if (
	$_POST['slug'] == 'comments'  //Check if ajax does post and if it is comments
	&& isset($_POST) 
	&& !empty($_POST['slug']) 
	&& filter_input(INPUT_SERVER, 'HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest'
){

// Create acitvity
   $comments->fb_id 			= "123456";
   $comments->activity_id  		= "123454";
   $comments->comment		  	= "bericht";  
   $activities->timestamp	  	= date(1);       


   $creation = $comments->Create(); //Insert into db mattie G
   
   if($creation) 
		echo "SQL geschreven\n FB id:".$activities->fb_id."\n titel:".$activities->title;

   else
		echo "SQL schrijven mislukt";
	
} else {
	
	echo "error";
	
}*/

   
   
/*   
// Update Person Info
   $person->id = "4";	
   $person->Age = "32";
   $saved = $person->Save(); 

// Find person
   $person->id = "4";		
   $person->Find();

   d($person->Firstname, "Person->Firstname");
   d($person->Age, "Person->Age");

// Delete person
   $person->id = "17";	
   $delete = $person->Delete();

 // Get all persons
   $persons = $person->all();  

   // Aggregates methods 
   d($person->max('age'), "Max person age");
   d($person->min('age'), "Min person age");
   d($person->sum('age'), "Sum persons age");
   d($person->avg('age'), "Average persons age");
   d($person->count('id'), "Count persons");
*/





		 		
	
			
			

   
   
   

?>
