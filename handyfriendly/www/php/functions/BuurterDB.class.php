<?php 
	require_once("easyCRUD.class.php");

	class Favorites  Extends Crud {
		
			# Your Table name 
			protected $table = 'favorites';
			
			# Primary Key of the Table
			protected $pk	 = 'favorite_id';
	}

	class Comments  Extends Crud {
		
			# Your Table name 
			protected $table = 'comments';
			
			# Primary Key of the Table
			protected $pk	 = 'toilet_id';
	}	

	class Toilets  Extends Crud {
		
			# Your Table name 
			protected $table = 'toilets';
			
			# Primary Key of the Table
			protected $pk	 = 'id';
	}	

	class Users  Extends Crud {
		
			# Your Table name 
			protected $table = 'users';
			
			# Primary Key of the Table
			protected $pk	 = 'id';
	}	
	
?>