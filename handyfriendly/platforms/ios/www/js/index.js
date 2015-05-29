var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
    	
    }
 
};

app.initialize();

var module = angular.module('handyfriendly', ['onsen']); //'uiGmapgoogle-maps'

module.controller('AppController', function($scope) { 
	ons.ready(function() {
	// Init code here
	});
});

/*module.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBeyepY1W5MQtdovxCS_6SWYouRGobAfz4',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});*/

module.controller('MapController', function($scope, $compile) {
	ons.ready(function() {
				
	    /*uiGmapGoogleMapApi.then(function(maps) {
	        $scope.map = { 
		        center: { 
			        latitude: 51.441642, 
			        longitude: 5.469722 
			    }, 
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
	        console.log('map: ', maps);
	    });*/
	    
	    //function initialize() {
		    	    		    
        	var myLatlng = new google.maps.LatLng(51.441642, 5.469722);
        
			var mapOptions = {
				center: myLatlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
			var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        
			//Marker + infowindow + angularjs compiled ng-click
			var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
			var compiled = $compile(contentString)($scope);

			var infowindow = new google.maps.InfoWindow({
				content: compiled[0]
        	});

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: 'Uluru (Ayers Rock)'
        	});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
        	});

			$scope.map = map;
				
      	//}
	  	
	  	//google.maps.event.addDomListener(window, 'load', initialize);
      
	  	$scope.centerOnMe = function() {
        	if(!$scope.map) {
				return;
        	}

			/*$scope.loading = $ionicLoading.show({
				content: 'Getting current location...',
				showBackdrop: false
        	});*/

			navigator.geolocation.getCurrentPosition(function(pos) {
				
				$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				
				//$scope.loading.hide();
        	}, function(error) {
				alert('Unable to get location: ' + error.message);
        	});
      	};
      
	  	$scope.clickTest = function() {
        	alert('Example of infowindow with ng-click')
      	};
			
	});
});


	
	
	
	
	
	
	
	

module.controller('FavoritesController', function($scope) {
	ons.ready(function() {

		$scope.fav_bar = {
			name: "favorites"	
		};
		
	});
});

module.controller('MarkerController', function($scope) {
	ons.ready(function() {
	// Init code here
	});
});

module.controller('SettingsController', function($scope) {
	ons.ready(function() {
	// Init code here
	});
});