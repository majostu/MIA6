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
	
	
		
		
    	/*window.plugins.uniqueDeviceID.get(success, fail);
	
		function success(uuid) {
		    console.log(uuid);
		};*/
		
	
	
	
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
	    
	    
	    function geoLocation() {
	    
		    var options = { enableHighAccuracy: true};
			watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		    
		    function onSuccess(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				localStorage.setItem("latitude", lat);
				localStorage.setItem("longitude", lng);
				
				var myLatlng = new google.maps.LatLng(lat, lng);
	    
				var mapOptions = {
					center: myLatlng,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
		    	};
				var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		    
				var contentString = "<div><a ng-click='clickTest()'>Mijn locatie</a></div>";
				var compiled = $compile(contentString)($scope);
		
				var infowindow = new google.maps.InfoWindow({
					content: compiled[0]
		    	});
		
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'Mijn locatie'
		    	});
		
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
		    	});
		
				$scope.map = map;				
			}
			
			function onError(error) {
				alert("message: " + error.message);
				localStorage.setItem("message", error.message);
			}
		
		}
	    	
	  	google.maps.event.addDomListener(window, 'load', geoLocation());
      
	  	/*$scope.centerOnMe = function() {
        	if(!$scope.map) {
				return;
        	}

			$scope.loading = $ionicLoading.show({
				content: 'Getting current location...',
				showBackdrop: false
        	});

			navigator.geolocation.getCurrentPosition(function(pos) {				
				$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));				
				//$scope.loading.hide();
        	}, function(error) {
				alert('Unable to get location: ' + error.message);
        	});
      	};
      
	  	$scope.clickTest = function() {
        	alert('Example of infowindow with ng-click')
      	};*/
			
	});
});

module.controller('AddMarkerController', function($scope) {
	ons.ready(function() {
		
		function geoLocation() {
			var myLatlng = new google.maps.LatLng(51.441642, 5.469722);
	
			var mapOptions = {
				center: myLatlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
	    	};
			var map = new google.maps.Map(document.getElementById("map_add_marker"), mapOptions);
	    
			$scope.map = map;						
		}
	    	
	  	google.maps.event.addDomListener(window, 'load', geoLocation());
	  	
	  	$scope.alert = function() {
	    	ons.notification.alert({
				//message: 'Message',
				message: 'Dubbel tap op een locatie om een wc toe te voegen.',
				title: 'Info',
				buttonLabel: 'OK',
				animation: 'default', // or 'none'
				// modifier: 'optional-modifier'
				callback: function() {
			    // Alert button is closed!
			  	}
			});
	  	}
			
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
					
		function geoLocation() {
			var myLatlng = new google.maps.LatLng(51.441642, 5.469722);
	
			var mapOptions = {
				center: myLatlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
	    	};
			var map = new google.maps.Map(document.getElementById("map_marker"), mapOptions);
	    
			$scope.map = map;						
		}
	    	
	  	google.maps.event.addDomListener(window, 'load', geoLocation()); 
	  	
	  	$scope.alert = function() {
	    	ons.notification.alert({
				//message: 'Message',
				messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
				title: 'Toegevoegd aan favorieten',
				buttonLabel: 'OK',
				animation: 'default', // or 'none'
				// modifier: 'optional-modifier'
				callback: function() {
			    // Alert button is closed!
			  	}
			});
	  	} 
	  	
	  	$scope.dialogs = {};   
	  	$scope.show = function(dlg) {
		  	if (!$scope.dialogs[dlg]) {
		  		ons.createDialog(dlg).then(function(dialog) {
		  			$scope.dialogs[dlg] = dialog;
		  			dialog.show();
	      		});
	    	} else {
				$scope.dialogs[dlg].show();
	    	}
  		}	
			
	});
});

module.controller('SettingsController', function($scope) {
	ons.ready(function() {
		
		
		document.addEventListener("deviceready", onDeviceReady, false);

	    function onDeviceReady() {
	        var element = document.getElementById('device-uuid');
	        element.innerHTML = ('Device UUID: ' + device.uuid + '');
	    }
		
		
	});
});