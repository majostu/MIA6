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
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true
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

module.controller('AddMarkerController', function($scope, $compile, $timeout) {
	ons.ready(function() {
		
		function geoAddMarker() {
	    
		    var options = { enableHighAccuracy: true};
			watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		    
		    function onSuccess(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				localStorage.setItem("latitude", lat);
				localStorage.setItem("longitude", lng);
								
				$scope.map;
		        $scope.markers = [];
		        $scope.markerId = 1;

	            var latlng = new google.maps.LatLng(lat, lng);
	            var myOptions = {
	                zoom: 16,
	                center: latlng,
	                mapTypeId: google.maps.MapTypeId.ROADMAP,
	                disableDefaultUI: true
	            };
	            
	            $scope.map = new google.maps.Map(document.getElementById("map_add_marker"), myOptions); 
	            
	            var contentString = "<div><a ng-click='clickTest()'>Mijn locatie</a></div>";
				var compiled = $compile(contentString)($scope);
		
				var infowindow = new google.maps.InfoWindow({
					content: compiled[0]
		    	});
		
				var marker = new google.maps.Marker({
					position: latlng,
					map: $scope.map,
					title: 'Mijn locatie'
		    	});
		
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open($scope.map,marker);
		    	});
	            
	            $scope.overlay = new google.maps.OverlayView();
	            $scope.overlay.draw = function() {}; // empty function required
	            $scope.overlay.setMap($scope.map);
	            $scope.element = document.getElementById('map_add_marker');
	            $scope.hammertime = Hammer($scope.element).on("tap", function(event) {
	                $scope.addOnClick(event);
	            });
		
		        /*//Delete all Markers
		        $scope.deleteAllMarkers = function(){
		
		            if($scope.markers.length == 0){
		                ons.notification.alert({
		                    message: 'There are no markers to delete!!!'
		                });
		                return;
		            }
		
		            for (var i = 0; i < $scope.markers.length; i++) {
		
		                //Remove the marker from Map                  
		                $scope.markers[i].setMap(null);
		            }
		
		            //Remove the marker from array.
		            $scope.markers.length = 0;
		            $scope.markerId = 0;
		
		            ons.notification.alert({
		                message: 'All Markers deleted.'
		            });   
		        };
		
		        $scope.rad = function(x) {
		            return x * Math.PI / 180;
		        };
		
		        //Calculate the distance between the Markers
		        $scope.calculateDistance = function(){
		
		            if($scope.markers.length < 2){
		                ons.notification.alert({
		                    message: 'Insert at least 2 markers!!!'
		                });
		            }
		            else{
		                var totalDistance = 0;
		                var partialDistance = [];
		                partialDistance.length = $scope.markers.length - 1;
		
		                for(var i = 0; i < partialDistance.length; i++){
		                    var p1 = $scope.markers[i];
		                    var p2 = $scope.markers[i+1];
		
		                    var R = 6378137; // Earth’s mean radius in meter
		                    var dLat = $scope.rad(p2.position.lat() - p1.position.lat());
		                    var dLong = $scope.rad(p2.position.lng() - p1.position.lng());
		                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		                    Math.cos($scope.rad(p1.position.lat())) * Math.cos($scope.rad(p2.position.lat())) *
		                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
		                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		                    totalDistance += R * c / 1000; //distance in Km
		                    partialDistance[i] = R * c / 1000;
		                }
		
		
		                ons.notification.confirm({
		                    message: 'Do you want to see the partial distances?',
		                    callback: function(idx) {
		
		                        ons.notification.alert({
		                            message: "The total distance is " + totalDistance.toFixed(1) + " km"
		                        });
		
		                        switch(idx) {
		                            case 0:
		
		                                break;
		                            case 1:
		                                for (var i = (partialDistance.length - 1); i >= 0 ; i--) {
		
		                                    ons.notification.alert({
		                                        message: "The partial distance from point " + (i+1) + " to point " + (i+2) + " is " + partialDistance[i].toFixed(1) + " km"
		                                    });
		                                }
		                                break;
		                        }
		                    }
		                });
		            }
		        };*/
		
		        //Add single Marker
		        $scope.addOnClick = function(event) {
		            var x = event.gesture.center.pageX;
		            var y = event.gesture.center.pageY-44;
		            var point = new google.maps.Point(x, y);
		            var coordinates = $scope.overlay.getProjection().fromContainerPixelToLatLng(point);
		
		            var marker = new google.maps.Marker({
		                position: coordinates,
		                map: $scope.map
		            });
		
		            marker.id = $scope.markerId;
		            $scope.markerId++;
		            $scope.markers.push(marker);
		        
		            ons.notification.confirm({
			            title: 'Bevestiging',
	                    message: 'Weet je zeker dat je op deze locatie een wc wilt toevoegen?',
	                    callback: function(idx) {
	                        switch(idx) {
	                            case 0:
	                                for (var i = 0; i < $scope.markers.length; i++) {
	                                    if ($scope.markers[i].id == marker.id) {
	                                        //Remove the marker from Map                  
	                                        $scope.markers[i].setMap(null);
	
	                                        //Remove the marker from array.
	                                        $scope.markers.splice(i, 1);
	                                    }
	                                }
	                                ons.notification.alert({
		                                messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
										title: 'WC verwijderd',
										buttonLabel: 'OK'
	                                });
	                                break;
	                            case 1:
	                                ons.notification.alert({
		                                messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
										title: 'WC toegevoegd',
										buttonLabel: 'OK'
	                                });
	                                break;
	                        }
	                    }
	                });
		            		
		            /*$timeout(function(){
		                //Creation of the listener associated to the Markers click
			            google.maps.event.addListener(marker, "click", function (e) {
			                ons.notification.confirm({
			                    message: 'Do you want to delete the marker?',
			                    callback: function(idx) {
			                        switch(idx) {
			                            case 0:
			                                ons.notification.alert({
			                                    message: 'You pressed "Cancel".'
			                                });
			                                break;
			                            case 1:
			                                for (var i = 0; i < $scope.markers.length; i++) {
			                                    if ($scope.markers[i].id == marker.id) {
			                                        //Remove the marker from Map                  
			                                        $scope.markers[i].setMap(null);
			
			                                        //Remove the marker from array.
			                                        $scope.markers.splice(i, 1);
			                                    }
			                                }
			                                ons.notification.alert({
			                                    message: 'Marker deleted.'
			                                });
			                                break;
			                        }
			                    }
			                });   
			            });
		            },1000);*/
		        };
		        				
			}
			
			function onError(error) {
				alert("message: " + error.message);
				localStorage.setItem("message", error.message);
			}
		
		}
	    	
	  	google.maps.event.addDomListener(window, 'load', geoAddMarker());
	    	
	  	$scope.alert = function() {
	    	ons.notification.alert({
				//message: 'Message',
				message: 'Tap op een locatie om een wc toe te voegen.',
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