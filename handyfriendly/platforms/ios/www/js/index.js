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

var module = angular.module('handyfriendly', ['onsen', 'LocalStorageModule']);

module.config(function (localStorageServiceProvider, $httpProvider) {
  	localStorageServiceProvider
    .setPrefix('handyfriendly');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
});

module.controller('AppController', function($scope, localStorageService) { 
	ons.ready(function() {
		
		if(localStorageService.isSupported) {
			console.log('storage supported: yes; type: local storage');
		}
		
	});
});

module.controller('MapController', function($scope, $compile, localStorageService) {
	ons.ready(function() {
			    
	    var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_toilets: "all"
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
			    
	    function geoLocation() {
	    	
		    var options = { frequency: 5000, enableHighAccuracy: true};
			watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		    
		    function onSuccess(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				localStorage.setItem("latitude", lat);
				localStorage.setItem("longitude", lng);
				
				$scope.markers = [];
		        $scope.markerId = 1;
		        
		        $scope.mymarker = [];
		        $scope.mymarkerId = 1;
		        				
				var myLatlng = new google.maps.LatLng(lat, lng);
				
				var directionsService = new google.maps.DirectionsService();
				// Create a renderer for directions and bind it to the map.
				var rendererOptions = {
					map: map
				}
				directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
				
				var stepDisplay = new google.maps.InfoWindow();				
	    
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
				
				var icon_myPos = {
				    url: "img/wheelchair.png",
				    /*scaledSize: new google.maps.Size(50, 50), // scaled size
				    origin: new google.maps.Point(0,0), // origin
				    anchor: new google.maps.Point(0, 0) // anchor*/
				};
				
				var MyMarker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'Mijn huidige locatie',
					optimized: false,
					animation: google.maps.Animation.DROP,
					icon: icon_myPos
		    	});
		    			    	
				google.maps.event.addListener(MyMarker, 'click', function() {
					infowindow.open(map,MyMarker);
		    	});
		    	
		    	MyMarker.id = $scope.mymarkerId;
				$scope.mymarkerId++;
				$scope.mymarker.push(MyMarker);
		    			    	
		    	var oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true, markersWontHide: true, keepSpiderfied: true, nearbyDistance: 20, legWeight: 1});
				var infoWindow = new google.maps.InfoWindow();
								
				for (var i = 0; i < json.length; i ++) {
					var data = json[i];
					var loc = new google.maps.LatLng(data.latitude, data.longitude);
										
					var icon_bad = {
					    url: "img/markerbadicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
							origin: new google.maps.Point(0,0), // origin
							anchor: new google.maps.Point(0, 0) // anchor*/
					};
					
					var icon_medium = {
					    url: "img/markermediumicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
							origin: new google.maps.Point(0,0), // origin
							anchor: new google.maps.Point(0, 0) // anchor*/
					};
					
					var icon_good = {
					    url: "img/markergoodicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
						origin: new google.maps.Point(0,0), // origin
						anchor: new google.maps.Point(0, 0) // anchor*/
					};
<<<<<<< HEAD
					
					var icon_added = {
					    url: "img/markeraddicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
						origin: new google.maps.Point(0,0), // origin
						anchor: new google.maps.Point(0, 0) // anchor*/
					};
										
					if (data.type == 1 && data.rating <= 1)  {						
=======
										
					if (data.type == 2 && data.rating <= 1)  {						
>>>>>>> origin/project
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_bad
						});							
					} else if (data.type == 1 && data.rating <= 3)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_medium
						});							
					} else if (data.type == 1 && data.rating >= 4)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_good
						});							
					} else if (data.device_id = device.uuid)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_added
						});							
					}  
					
					WCMarker.desc = data.name;
					oms.addMarker(WCMarker);
					infoBox(map, WCMarker, data);
					
					WCMarker.id = $scope.markerId;
					$scope.markerId++;
					$scope.markers.push(WCMarker);
				}
		
				function infoBox(map, WCMarker, data) {
					oms.addListener('click', function(WCMarker, event) {
						infoWindow.setContent(WCMarker.desc);
						infoWindow.open(map, WCMarker);
					});
			
					oms.addListener('spiderfy', function(WCMarker) {
						infoWindow.close();
					});
					
						
					(function(WCMarker, data) {
						
						google.maps.event.addListener(WCMarker, "click", function(e) {		
																
							if (data.rating == 1)  {						
								var rating_star = 	'<li><i class="ion-star active"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li>';
							} else if (data.rating == 2)  {						
								var rating_star = 	'<li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li>';
							} else if (data.rating == 3)  {						
								var rating_star = 	'<li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li>';
							} else if (data.rating == 4)  {						
								var rating_star = 	'<li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star"></i></li>';
							} else if (data.rating == 5)  {						
								var rating_star = 	'<li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li><li><i class="ion-star active"></i></li>';
							} else if (data.rating == 0)  {						
								var rating_star = 	'<li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li><li><i class="ion-star"></i></li>';
							} 
							
<<<<<<< HEAD
							if (data.device_id == device.uuid) {
=======
							if (data.device_id == "USER_ID") {
>>>>>>> origin/project
								var MarkerBin = '<div class="button-bar" style="border-bottom: 1px solid #ddd;"><div class="button-bar__item" ng-click="getDirection(' + data.id + ')"><button class="button-bar__button"><i class="fa fa-compass" style="color: #25c2aa;"></i></button></div><div class="button-bar__item"><button class="button-bar__button" ng-click="pushPage(' + data.id + ')"><i class="fa fa-info-circle" style="color: #25c2aa;"></i></button></div><div class="button-bar__item"><button class="button-bar__button" ng-click="deleteMarker(' + data.id +')"><i class="fa fa-trash-o" style="color: #25c2aa;"></i></button></div></div>';
							} else {
								var MarkerBin = '<div class="button-bar" style="border-bottom: 1px solid #ddd;"><div class="button-bar__item" ng-click="getDirection(' + data.id + ')"><button class="button-bar__button"><i class="fa fa-compass" style="color: #25c2aa;"></i></button></div><div class="button-bar__item"><button class="button-bar__button" ng-click="pushPage(' + data.id + ')"><i class="fa fa-info-circle" style="color: #25c2aa;"></i></button></div></div>';
							}
							
							var markerData = 
								'<div id="map-info-window">'+
									'<div id="map-info-window-inner">'+
										'<p><b>'+ data.name +'</b></p>'+
										'<p>' + data.address + '</p>' +
										'<ul>' + rating_star + '</ul>' +
										'<p>' + MarkerBin + '</p>' +
									'</div>'+
								'</div>'									
							;
							
							var compiledMarker = $compile(markerData)($scope);

							infoWindow.setContent(compiledMarker[0]);
							infoWindow.open(map, WCMarker);
						});
					})(WCMarker, data);
																			
					$scope.getDirection = function(id) {
										
						$(".map_button").show();
						
						infoWindow.close(map, WCMarker);
									
						var json = (function () {
							var json = null;
							$.ajax({
								'type':'GET',
								'async': false,
								'global': false,
								'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
								'dataType': "json",
								'data': $.param({ 
									get_profile: id
								}),
								'success': function (data) {
									json = data;
								}
							});
							return json;							
						})();
												
						var profile_address = json.variables.address;
					    
					    markerArray = [];
					        				    
						// First, remove any existing markers from the map.
						for (var i = 0; i < markerArray.length; i++) {
							markerArray[i].setMap(null);
							markerArray.splice(i, 1);
						}
						
						// Now, clear the array itself.
						markerArray = [];
						
						// Retrieve the start and end locations and create
						// a DirectionsRequest using WALKING directions.
						directionsDisplay.setMap(map);
						  
						var request = {
							origin: myLatlng,
							destination: profile_address,
							travelMode: google.maps.TravelMode.WALKING
						};
						
						// Route the directions and pass the response to a
						// function to create markers for each step.
						directionsService.route(request, function(response, status) {
							if (status == google.maps.DirectionsStatus.OK) {
						    	var warnings = document.getElementById('warnings_panel');
								warnings.innerHTML = '<p>De afstand tot het toilet is <b>' + response.routes[0].legs[0].distance.text + '</b></p>';
								directionsDisplay.setDirections(response);
								showSteps(response);
						    }						    
						});
												 						  											   
				    };
				    
				    function showSteps(directionResult) {
					    
				      markerArray = [];
					  // For each step, place a marker, and add the text to the marker's
					  // info window. Also attach the marker to an array so we
					  // can keep track of it and remove it when calculating new
					  // routes.
					  var myRoute = directionResult.routes[0].legs[0];
<<<<<<< HEAD
					
					  for (var i = 0; i < myRoute.steps.length; i++) {
					    var Setmarker = new google.maps.Marker({
					      position: myRoute.steps[i].start_location,
					      map: map
					    });
					    attachInstructionText(Setmarker, myRoute.steps[i].instructions);
					    markerArray[i] = Setmarker;
					  }
					  
					}
					
=======
					
					  for (var i = 0; i < myRoute.steps.length; i++) {
					    var Setmarker = new google.maps.Marker({
					      position: myRoute.steps[i].start_location,
					      map: map
					    });
					    attachInstructionText(Setmarker, myRoute.steps[i].instructions);
					    markerArray[i] = Setmarker;
					  }
					  
					}
					
>>>>>>> origin/project
					function attachInstructionText(Setmarker, text) {
					  google.maps.event.addListener(Setmarker, 'click', function() {
					    // Open an info window when the marker is clicked on,
					    // containing the text of the step.
					    stepDisplay.setContent(text);
					    stepDisplay.open(map, Setmarker);
					  });
					}
				    
				    $scope.stopDirection = function() {
		
						$(".map_button").hide();
						
						location.reload();
																		
						directionsDisplay.setMap(null);
						directionDisplay.setPanel(null);
						directionsDisplay.setDirections(null);						
						stepDisplay.setContent(null);
								
					};
					
					$scope.pushPage = function(id) {
												
						var json = (function () {
							var json = null;
							$.ajax({
								'type':'GET',
								'async': false,
								'global': false,
								'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
								'dataType': "json",
								'data': $.param({ 
									get_profile: id
								}),
								'success': function (data) {
									json = data;
								}
							});
							return json;							
						})();
												
						var profile_id = json.variables.id;
						
						localStorage.setItem("profile_id", profile_id);
						
		  				mapNavigator.pushPage("marker.html", { animation : "slide" });
		  					  				
	  				};
									
					$scope.deleteMarker = function(id){
		                ons.notification.confirm({
			                title: 'Bevestiging',
		                    message: 'Weet je zeker dat je deze WC wilt verwijderen?',
		                    callback: function(idx) {
		                        switch(idx) {
		                            case 0:
		                            
		                                break;
		                            case 1:
		                            
		                                /*for (var i = 0; i < $scope.markers.length; i++) {
		                                    if ($scope.markers[i].id == WCMarker.id) {
		                                        //Remove the marker from Map                  
		                                        $scope.markers[i].setMap(null);
		
		                                        //Remove the marker from array.
		                                        $scope.markers.splice(i, 1);
		                                    }
		                                }*/
      		                                
		                                var json = (function () {
											var json = null;
											$.ajax({
												'type':'GET',
												'async': false,
												'global': false,
												'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
												'dataType': "json",
												'data': $.param({ 
													delete_id: id
												}),
												'success': function (data) {
													json = data;
												}
											});
											return json;
										})();
												                               	
		                                ons.notification.alert({
			                                messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
											title: 'WC verwijderd',
											buttonLabel: 'OK',
											callback: function() {
														
												localStorage.removeItem("profile_id");
												location.reload();

											}
		                                });
		                                
		                                break;
		                        }
		                    }
		                });   
			        };					
					
  				}
  				
  				
  				//mymarker_lat = $scope.mymarker[0].position.A;
  				//mymarker_long = $scope.mymarker[0].position.F;
  				
  				//var mymarker = new google.maps.LatLng(mymarker_lat, mymarker_long);
  				
  				
  				
  				
  				$scope.closestMarker = function() { 
	  				  				
	  				/*console.log($scope.markers);
	  				
	  				$scope.rad = function(x) {
			            return x * Math.PI / 180;
			        };
	  									  	
	                var totalDistance = 0;
	                var partialDistance = [];
	                partialDistance.length = $scope.markers.length -1;
	
	                for(var i = 0; i < partialDistance.length; i++){
		                	                
	                    var p1 = $scope.mymarker[i];
	                    var p2 = $scope.markers[i++];
						
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
	                });*/
			    				    				    	
				}
  				  				  				  				  				
				$scope.map = map;
																									
			}
			
			function onError(error) {
				alert("message: " + error.message);
				localStorage.setItem("message", error.message);
			}
		
		}
	    	
	  	google.maps.event.addDomListener(window, 'load', geoLocation());
	  		  	   
	  	$scope.centerOnMe = function() {
        	if(!$scope.map) {
				return;
        	}

			navigator.geolocation.getCurrentPosition(function(position) {				
				$scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));				
        	}, function(error) {
				alert('Unable to get location: ' + error.message);
        	});
      	};
      		
	});
});

module.controller('AddMarkerController', function($scope, $compile, localStorageService, $http) {
	ons.ready(function() {
		
		$scope.dialogs = {};
   
		$scope.AddMarkerShow = function(dlg) {
			if (!$scope.dialogs[dlg]) {
		    	ons.createDialog(dlg).then(function(dialog) {
		        	$scope.dialogs[dlg] = dialog;
					dialog.show();
		      	});
		   	}
		    else {
		    	$scope.dialogs[dlg].show();
		    }
		}
		
		var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_toilets: "all"
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
				
		function geoAddMarker() {
	    
		    var options = { frequency: 5000, enableHighAccuracy: true};
			watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		    
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
	            
	           var map = new google.maps.Map(document.getElementById("map_add_marker"), myOptions); 
	            
	            var contentString = "<div><a ng-click='clickTest()'>Mijn locatie</a></div>";
				var compiled = $compile(contentString)($scope);
		
				var infowindow = new google.maps.InfoWindow({
					content: compiled[0]
		    	});
		    			    	
		    	var icon_myPos = {
				    url: "img/wheelchair.png",
				    /*scaledSize: new google.maps.Size(50, 50), // scaled size
				    origin: new google.maps.Point(0,0), // origin
				    anchor: new google.maps.Point(0, 0) // anchor*/
				};
								
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: 'Mijn locatie',
					optimized: false,
					animation: google.maps.Animation.DROP,
					icon: icon_myPos
		    	});
		
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
		    	});
		        
	            $scope.overlay = new google.maps.OverlayView();
	            $scope.overlay.draw = function() {}; // empty function required
	            $scope.overlay.setMap(map);
	            $scope.element = document.getElementById('map_add_marker');
	            $scope.hammertime = Hammer($scope.element).on("doubletap", function(event) {
	                $scope.addOnClick(event);
	            });
	            
	            var oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true, markersWontHide: true, keepSpiderfied: true, nearbyDistance: 20, legWeight: 1});
				
				for (var i = 0; i < json.length; i ++) {
					var data = json[i];
					var loc = new google.maps.LatLng(data.latitude, data.longitude);
					
					var icon_bad = {
					    url: "img/markerbadicon.png",
					    scaledSize: new google.maps.Size(66, 66), // scaled size
					    origin: new google.maps.Point(0,0), // origin
					    anchor: new google.maps.Point(0, 0) // anchor
					};
					
					var icon_medium = {
					    url: "img/markermediumicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
							origin: new google.maps.Point(0,0), // origin
							anchor: new google.maps.Point(0, 0) // anchor*/
					};
					
					var icon_good = {
					    url: "img/markergoodicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
						origin: new google.maps.Point(0,0), // origin
						anchor: new google.maps.Point(0, 0) // anchor*/
					};
					
<<<<<<< HEAD
					var icon_added = {
					    url: "img/markeraddicon.png",
					    /*scaledSize: new google.maps.Size(50, 50), // scaled size
						origin: new google.maps.Point(0,0), // origin
						anchor: new google.maps.Point(0, 0) // anchor*/
					};
					
					if (data.type == 1 && data.rating <= 1)  {						
=======
					if (data.type == 2 && data.rating <= 1)  {						
>>>>>>> origin/project
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_bad
						});							
					} else if (data.type == 1 && data.rating <= 3)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_medium
						});							
					} else if (data.type == 1 && data.rating >= 4)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_good
						});							
					} else if (data.device_id = device.uuid)  {						
						var WCMarker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: icon_added
						});							
					} 
					
					WCMarker.desc = data.name;
					oms.addMarker(WCMarker);
				}
		 			        		
		        //Add single Marker
		        $scope.addOnClick = function(event) {
		            var x = event.gesture.center.pageX;
		            var y = event.gesture.center.pageY-44;
		            var point = new google.maps.Point(x, y);
		            var coordinates = $scope.overlay.getProjection().fromContainerPixelToLatLng(point);
					
					var iconBase = 'img/';
		            var marker = new google.maps.Marker({
		                position: coordinates,
		                map: map,
		                optimized: false,
		                icon: iconBase + 'markerunrated.png'
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
	                            								
									$scope.AddMarkerShow('add-marker-form.html');
																								
									localStorage.setItem("marker-latitude", $scope.markers[0].position.A);
		                            localStorage.setItem("marker-longitude", $scope.markers[0].position.F);	
		                                                                       	
	                                break;
	                        }
	                    }
	                });
		        };  
		        
		        $scope.map = map;		       
		         				
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

module.controller('AddMarkerFormController', function($scope, $compile, localStorageService, $http) {
	ons.ready(function() {
		
		$scope.rating2 = 1;
  		$scope.isReadonly = true;  		
  		$scope.rateAddMarker = function(rating) { 		
  			console.log("Rating selected: " + rating);
  		}
  		
  		var marker_latitude = localStorage.getItem("marker-latitude");
		var marker_longitude = localStorage.getItem("marker-longitude");	
   		
		$scope.AddMarkerSubmit = function() {
			
			//var Device_id = device.uuid;
			//var Device_name = device.model;
			
<<<<<<< HEAD
			var Device_id = device.uuid;
			var Device_name = device.model;
=======
			var Device_id = "USER_ID";
			var Device_name = "USER_NAME";
>>>>>>> origin/project
			
        	var WC_latitude = marker_latitude;
        	var WC_longitude = marker_longitude;
       	
        	var json = (function () {
				var json = null;
				$.ajax({
					'type':'GET',
					'async': false,
					'global': false,
					'url': "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + WC_latitude + "," + WC_longitude + "&sensor=true",
					'dataType': "json",
					'success': function (data) {
						json = data;
					}
				});
				return json;										
			})();
			
			WC_latitude = json.results[0].geometry.location.lat;									
			WC_longitude = json.results[0].geometry.location.lng;
			var WC_address = json.results[0].formatted_address;
	                            									   		
			$scope.data = [];
			
			$scope.data.push(Device_id);			
			$scope.data.push($scope.marker_name);
			$scope.data.push(WC_address);
			$scope.data.push(WC_latitude);
			$scope.data.push(WC_longitude);
			$scope.data.push($scope.rating2);
			$scope.data.push($scope.marker_comment);
			$scope.data.push(Device_name);
									
			console.log($scope.data);
			
			$http({
				url:'http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/insert_marker.php',
				method:"POST",
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			    data: $.param({ 
					slug: "toilets",
					device_id: $scope.data[0],  
					name: $scope.data[1],
					address: $scope.data[2],
					latitude: $scope.data[3], 
					longitude: $scope.data[4],
					rating: $scope.data[5],
				}),  // pass in data as strings
				isArray: true,
				callback: ''
		  	}).success(function(data) {
				if (!data) {
					// if not successful, bind errors to error variables
					console.log(data);
					console.log('error');
					
					ons.notification.alert({
                        messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
						title: 'Oeps... er is iets fout gegaan',
						buttonLabel: 'OK',
						callback: function() {
							
							localStorage.removeItem("profile_id");
							location.reload();
						
						}
                    });
					
				} else {
				  	// if successful, bind success message to message
				  	console.log(data);
				  	console.log('success');
				  	
				  	var json = (function () {
						var json = null;
						$.ajax({
							'type':'GET',
							'async': false,
							'global': false,
							'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
							'dataType': "json",
							'data': $.param({ 
								get_toilets: "all"
							}),
							'success': function (data) {
								json = data;
							}
						});
						return json;
					})();
					
					var profile_data_id = $(json).last()[0].id;
					//var added_id = $(json).last()[0].id;
									  	
				  	$scope.data = [];
			
				  	$scope.data.push(profile_data_id );
					$scope.data.push(Device_id);			
					$scope.data.push($scope.rating2);
					$scope.data.push($scope.marker_comment);
					$scope.data.push(Device_name);
					
					//$scope.data.push(added_id);
											
					console.log($scope.data);
					
					$http({
						url:'http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/insert_marker.php',
						method:"POST",
						headers: {
							'X-Requested-With': 'XMLHttpRequest',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
					    data: $.param({ 
							slug: "saveRateComment",
							toilet_id: $scope.data[0], 
							device_id: $scope.data[1],  
							rating: $scope.data[2],
							comment: $scope.data[3],
							device_name: $scope.data[4],
							//added_id: $scope.data[5]
						}),  // pass in data as strings
						isArray: true,
						callback: ''
				  	}).success(function(data) {
						if (!data) {
							// if not successful, bind errors to error variables
							console.log(data);
							console.log('error');
							
							ons.notification.alert({
		                        messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
								title: 'Oeps... er is iets fout gegaan',
								buttonLabel: 'OK',
								callback: function() {
									
									localStorage.removeItem("profile_id");
									location.reload();
								
								}
		                    });
							
						} else {
						  	// if successful, bind success message to message
						  	console.log(data);
						  	console.log('success');
						  
						  	ons.notification.alert({
		                    	messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
								title: 'WC toegevoegd',
								buttonLabel: 'OK',
								callback: function() {
															
									localStorage.removeItem("profile_id");
									location.reload();
																			
								}
		                	});			                              	                                	
						}
					});
							                              	                                	
				}
			});
						  				  								  				
		};
		
	});
});

module.controller('FavoritesController', function($scope, $compile, $http, localStorageService) {
	ons.ready(function() {

		$scope.fav_bar = {
			name: "favorites"	
		};
								
		var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_toilets: "all"
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		
		for (var i = 0; i < json.length; i ++) {
			
			var data = json[i];
			
			var element1 = document.getElementById("added-view");
			
			if (data.device_id == "USER_ID") {
			
				if (data.type == 2 && data.rating <= 1)  {						
					var image = "img/markerbadicon.png"
				} else if (data.type == 2 && data.rating <= 3)  {						
					var image =  "img/markermediumicon.png"
				} else if (data.type == 2 && data.rating >= 4)  {						
					var image =  "img/markergoodicon.png"
				} /*else if (data.device_id == device.uuid)  {						
					var image =  "img/markeraddicon.png"
				}*/ 
				
				if (data.rating == 1)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} else if (data.rating == 2)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} else if (data.rating == 3)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} else if (data.rating == 4)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} else if (data.rating == 5)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} else if (data.rating == 0)  {						
					var rating_star =	'<ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
				} 
				    			
				var listData =
					'<ons-list-item modifier="tappable chevron" class="list-item-container list__item ons-list-item-inner list__item--chevron" ng-click="pushPage(' + data.id + ')">' +
					    '<ons-row class="row ons-row-inner">' +
						    '<ons-col width="25%"><img src=' + image + ' class="col ons-col-inner thumbnail" /></ons-col>' +
						    '<ons-col width="50%" class="col ons-col-inner">' +
							    '<div class="name">' + data.name + '</div>' +
							    '<div class="location"><i class="fa fa-map-marker"></i> ' + data.address + '</div>' +
							    '<div class="desc">' + rating_star + '</div>' +
						    '</ons-col>' +
						    '<ons-col width="25%" class="col ons-col-inner"></ons-col>' +
					    '</ons-row>' +
				    '</ons-list-item>'									
				;
					
				var compiledData = $compile(listData)($scope);
	
				$(element1).append(compiledData[0]);
			
			}
					
		}
			
		$scope.favorite_id = [];	
		$scope.all = [];
								
		$.ajax({
			'type':'GET',
			'async': false,
			'global': false,
			'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
			'dataType': "json",
			'data': $.param({ 
				get_toilets: "all"
				
			}),
			'success': function (all) {
															
				$.ajax({
					'type':'GET',
					'async': false,
					'global': false,
					'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
					'dataType': "json",
					'data': $.param({ 
						get_favorites: "all"
					}),
					'success': function (data) {
						
						angular.forEach(data, function(data) {
							console.log(data.favorite_id);
						
							angular.forEach(all, function(all) {	
								
<<<<<<< HEAD
								if(data.favorite_id == all.id && data.device_id == device.uuid) {
=======
								if(data.favorite_id == all.id && data.device_id == "USER_ID") {
>>>>>>> origin/project
								
									$scope.favorite_id.push({id: data.favorite_id});
																		
									var element2 = document.getElementById("favorites-view");
						
<<<<<<< HEAD
									if (all.rating <= 1)  {						
										var image = "img/markerbadicon.png"
									} else if (all.rating <= 3)  {						
										var image =  "img/markermediumicon.png"
									} else if (all.rating >= 4)  {						
										var image =  "img/markergoodicon.png"
									} /*else if (all.device_id == device.uuid)  {						
										var image =  "img/markeraddicon.png"
									}*/
=======
									if (all.type == 2 && all.rating <= 1)  {						
										var image = "img/markerbad.png"
									} else if (all.type == 2 && all.rating <= 3)  {						
										var image =  "img/markermedium.png"
									} else if (all.type == 2 && all.rating >= 4)  {						
										var image =  "img/markergood.png"
									} 
>>>>>>> origin/project
									
									if (all.rating == 1)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} else if (all.rating == 2)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} else if (all.rating == 3)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} else if (all.rating == 4)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} else if (all.rating == 5)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} else if (all.rating == 0)  {						
										var rating_star =	'<ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
									} 
									    			
									var listData =
										'<ons-list-item modifier="tappable chevron" class="list-item-container list__item ons-list-item-inner list__item--chevron" ng-click="pushPage(' + data.id + ')">' +
										    '<ons-row class="row ons-row-inner">' +
											    '<ons-col width="25%"><img src=' + image + ' class="col ons-col-inner thumbnail" /></ons-col>' +
											    '<ons-col width="50%" class="col ons-col-inner">' +
												    '<div class="name">' + all.name + '</div>' +
												    '<div class="location"><i class="fa fa-map-marker"></i> ' + all.address + '</div>' +
												    '<div class="desc">' + rating_star + '</div>' +
											    '</ons-col>' +
											    '<ons-col width="25%" class="col ons-col-inner"></ons-col>' +
										    '</ons-row>' +
									    '</ons-list-item>'									
									;
										
									var compiledData = $compile(listData)($scope);
						
									$(element2).append(compiledData[0]);
																		
								}
							});
						});
					}								
				});				
			}
		});
	
		$scope.pushPage = function(id) {
												
			var json = (function () {
				var json = null;
				$.ajax({
					'type':'GET',
					'async': false,
					'global': false,
					'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
					'dataType': "json",
					'data': $.param({ 
						get_profile: id
					}),
					'success': function (data) {
						json = data;
					}
				});
				return json;							
			})();
									
			var profile_id = json.variables.id;
			
			localStorage.setItem("profile_id", profile_id);
			
			favoritesNavigator.pushPage("marker.html", { animation : "slide" });
					  				
		};
				
	});
});

module.controller('MarkerController', function($scope, $compile, $http, localStorageService) {
	ons.ready(function() {
	
	  	$scope.addToFavorites = function() {
		  	
		  	var profile_value = localStorage.getItem("profile_id");
<<<<<<< HEAD
		  	var Device_id = device.uuid;
			var Device_name = device.model;
=======
		  	var Device_id = "USER_ID";
			var Device_name = "USER_NAME";
>>>>>>> origin/project
		  	
		  	var json = (function () {
				var json = null;
				$.ajax({
					'type':'GET',
					'async': false,
					'global': false,
					'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
					'dataType': "json",
					'data': $.param({ 
						get_profile: profile_value
					}),
					'success': function (data) {
						json = data;
					}
				});
				return json;
			})();
						
			var profile_data_id = json.variables.id;
			
			$scope.data = [];
			
		  	$scope.data.push(profile_data_id);
		  	$scope.data.push(Device_id);
		  	$scope.data.push(Device_name);
									
			console.log($scope.data);
<<<<<<< HEAD
												
=======
			
			
										
>>>>>>> origin/project
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_favorite: profile_data_id
				}),
				'success': function (all) {
					
					angular.forEach(all, function(all) {
																	
<<<<<<< HEAD
						if(is.set(all.favorite_id) && all.favorite_id == profile_data_id && all.device_id == device.uuid) {
=======
						if(is.set(all.favorite_id) && all.favorite_id == profile_data_id && all.device_id == "USER_ID") {
>>>>>>> origin/project
						
							console.log("Bestaat al");
							ons.notification.alert({
		                    	messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
								title: 'Al reeds aan favorieten toegevoegd',
								buttonLabel: 'OK',
								animation: 'default', // or 'none'
								// modifier: 'optional-modifier'
								callback: function() {
					
								}
		                	});	
							
						} else {
							
							console.log("MAG WEL");
							
							$http({
								url:'http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/insert_marker.php',
								method:"POST",
								headers: {
									'X-Requested-With': 'XMLHttpRequest',
									'Content-Type': 'application/x-www-form-urlencoded'
								},
							    data: $.param({ 
									slug: "saveFavoriteMarker",
									favorite_id: $scope.data[0],
									device_id: $scope.data[1],
									device_name: $scope.data[2]
								}),  // pass in data as strings
								isArray: true,
								callback: ''
						  	}).success(function(data) {
								if (!data) {
									// if not successful, bind errors to error variables
									console.log(data);
									console.log('error');
									
									ons.notification.alert({
				                        messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
										title: 'Oeps... er is iets fout gegaan',
										buttonLabel: 'OK',
										callback: function() {
											
											localStorage.removeItem("profile_id");
											location.reload();
										
										}
				                    });
									
								} else {
								  	// if successful, bind success message to message
								  	console.log(data);
								  	console.log('success');
								  
								  	ons.notification.alert({
				                    	messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
										title: 'Toegevoegd aan favorieten',
										buttonLabel: 'OK',
										animation: 'default', // or 'none'
										// modifier: 'optional-modifier'
										callback: function() {
																	
											localStorage.removeItem("profile_id");
											location.reload();
																					
										}
				                	});			                              	                                	
								}
							});
							
						}
						
					});
										
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
  		
  		var profile_value = localStorage.getItem("profile_id");
    		
  		var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_profile: profile_value
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		
		function geoLocation() {
			var myLatlng = new google.maps.LatLng(json.variables.latitude, json.variables.longitude);
	
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
				
		var element1 = document.getElementById("profile_data");
		var element2 = document.getElementById("rating_data");
		
		if (json.variables.type == 1 && json.variables.rating <= 1)  {						
			var image = "img/markerbadicon.png"
		} else if (json.variables.type == 1 && json.variables.rating <= 3)  {						
			var image =  "img/markermediumicon.png"
		} else if (json.variables.type == 1 && json.variables.rating >= 4)  {						
			var image =  "img/markergoodicon.png"
		} else if (json.variables.type == 2)  {						
			var image =  "img/markeraddicon.png"
		} else if (json.variables.device_id == device.uuid)  {						
			var image =  "img/markeraddicon.png"
		}
		
		if (json.variables.rating == 1)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} else if (json.variables.rating == 2)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} else if (json.variables.rating == 3)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} else if (json.variables.rating == 4)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} else if (json.variables.rating == 5)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} else if (json.variables.rating == 0)  {						
			var rating_star =	'<ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
		} 
		    			
		var profile_Data =			    					
	  		'<div class="card-name">' + json.variables.name + '</div>' +
	  		'<div class="card-desc">' + json.variables.address + '</div>' +
	  		'<div class="card-image"><img src=' + image + '></div>'
		;
		
		var compiledData1 = $compile(profile_Data)($scope);

		$(element1).append(compiledData1);
		
		var rating_Data =
		  	'<div class="rating">' +
		        '<div class="rating-num">' + rating_star + '</div>' +
	        '</div>'							
		;
		
		var compiledData2 = $compile(rating_Data)($scope);

		$(element2).append(compiledData2[0]);
				
		var element3 = document.getElementById("comment_data");
		
		var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_comments: 'all'
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		
		var comment_id_data = [];
				
		for (var i = 0; i < json.length; i ++) {
			var data = json[i];
			
			if (data.toilet_id == profile_value) {
				comment_id_data.push(data);	
			}				
		}
		
		for (var i = 0; i < comment_id_data.length; i ++) {			
			var data = comment_id_data[i];
						
			if (data.rating == 1)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 2)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 3)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 4)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 5)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 0)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} 
			
			var comment_Data =
				'<ons-list-item class="timeline-li">' +
					'<ons-row>' +
						'<ons-col>' +
							'<div class="timeline-date">' + data.timestamp +'</div>' +
							'<div class="timline-from">' +
								'<span class="timeline-name">' + data.device_name +'</span>' +
								'<span class="timeline-id">' + rating_star + '</span>' +
	            			'</div>' +
							'<div class="timeline-message">' + data.comment + '</div>' +
						'</ons-col>' +
					'</ons-row>' +
				'</ons-list-item>'						
			;
			
			var compiledData3 = $compile(comment_Data)($scope);
	
			$(element3).append(compiledData3[0]);		
		}
		
		$scope.remove_id = function() {
			localStorage.removeItem("profile_id");		
		};
		
	});
});

module.controller('CommentController', function($scope, $compile, localStorageService, $http) {
	ons.ready(function() {
		
		$scope.rating1 = 1;
  		$scope.isReadonly = true;  		
  		$scope.rateFunction = function(rating) { 		
  			console.log("Rating selected: " + rating);
  		}
  		
  		$scope.submit = function() {
	  				  		
	  		var profile_value = localStorage.getItem("profile_id");	  		
	  		//var Device_id = device.uuid;
	  		//var Device_name = device.model;
	  		
<<<<<<< HEAD
	  		var Device_id = device.uuid;
			var Device_name = device.model;
=======
	  		var Device_id = "USER_ID";
			var Device_name = "USER_NAME";
>>>>>>> origin/project
	  		
  			$scope.data = [];
												
			$scope.data.push(parseInt(profile_value));
			$scope.data.push(Device_id);
			$scope.data.push(Device_name);
			$scope.data.push($scope.comment_text);
			$scope.data.push($scope.rating1);
												
			console.log($scope.data);
			
			$http({
				url:'http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/insert_marker.php',
				method:"POST",
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			    data: $.param({ 
					slug: "comments",
					toilet_id: $scope.data[0], 
					device_id: $scope.data[1],
					device_name: $scope.data[2],  
					comment: $scope.data[3],
					rating: $scope.data[4]
				}),  // pass in data as strings
				isArray: true,
				callback: ''
		  	}).success(function(data) {
				if (!data) {
					// if not successful, bind errors to error variables
					console.log(data);
					console.log('error');
					
					ons.notification.alert({
                        messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
						title: 'Oeps... er is iets fout gegaan',
						buttonLabel: 'OK',
						callback: function() {

							localStorage.removeItem("profile_id");
							location.reload();
							
						}
                    });
					
				} else {
				  	// if successful, bind success message to message
				  	console.log(data);
				  	console.log('success');
				  					  	
				  	var json = (function () {
						var json = null;
						$.ajax({
							'type':'GET',
							'async': false,
							'global': false,
							'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
							'dataType': "json",
							'data': $.param({
								get_rates: profile_value
							}),
							'success': function (data) {
								json = data;
							}
						});
						return json;
					})();
							  	
				  	var rates = [];
				  	
				  	for (var i = 0; i < json.length; i ++) {
						var data = json[i];
						rates.push(data.rating);
					}
						
					var average = rates.map(function(x,i,arr){return x/arr.length}).reduce(function(a,b){return a + b});
				  	
				  	$scope.data = [];
												
					$scope.data.push(parseInt(profile_value));
					$scope.data.push(average);
														
					console.log($scope.data);
				  					  	
				  	$http({
						url:'http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/insert_marker.php',
						method:"POST",
						headers: {
							'X-Requested-With': 'XMLHttpRequest',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
					    data: $.param({ 
							slug: "updateRating",
							toilet_id: $scope.data[0], 
							rating: $scope.data[1]
						}),  // pass in data as strings
						isArray: true,
						callback: ''
				  	}).success(function(data) {
						if (!data) {
							// if not successful, bind errors to error variables
							console.log(data);
							console.log('error');
							
							ons.notification.alert({
		                        messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
								title: 'Oeps... er is iets fout gegaan',
								buttonLabel: 'OK',
								callback: function() {
		
									localStorage.removeItem("profile_id");
									location.reload();
									
								}
		                    });
							
						} else {
							// if successful, bind success message to message
							console.log(data);
							console.log('success');
						  							  							  	  	
						  	ons.notification.alert({
		                    	messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
								title: 'Reactie en beoordeling toegevoegd',
								buttonLabel: 'OK',
								callback: function() {
										
									localStorage.removeItem("profile_id");
									/*$scope.$watch(function(){
									
										//ng-model="datavar (naam van element in index)"
										
										$scope.datavar = "Nieuwe waarde";
										
									});*/
										
									
										
									location.reload();
									
								}
		                	});		                              	                                	
						}
					});
				  	                              	                                	
				}
			});		
	  		
	  	};	
		
	});
});
/*
	
	$index = markeridin array
	$scope.removeItem = function($index) { //Functions to remove checklist item
		$scope.marker.splice( $scope.marker.indexOf(), $index )
		console.log($index);
	}; //Dit is code om array 1 te verwijderen > ook weer een scope watch.. even angular functie door lezen, is n lastige en kan best uitgebreid worden..	
*/	
module.directive("starRating", function() {
		return {
			restrict : "EA",
				template : "<ul class='rating-stars' ng-class='{readonly: readonly}'>" +
				"  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
				"    <i class='ion-star'></i>" + //&#9733
				"  </li>" +
				"</ul>",
				
			scope : {
				ratingValue : "=ngModel",
				max : "=?", //optional: default is 5
				onRatingSelected : "&?",
				readonly: "=?"
		},
		link : function(scope, elem, attrs) {
			if (scope.max == undefined) { scope.max = 5; }
			function updateStars() {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
				};
				scope.toggle = function(index) {
					if (scope.readonly == undefined || scope.readonly == false){
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating: index + 1
						});
					}
				};
				scope.$watch("ratingValue", function(oldVal, newVal) {
					if (newVal) { updateStars(); }
				});
			}
		};
});

module.controller('SettingsController', function($scope, localStorageService) {
	ons.ready(function() {
		
		
		/*document.addEventListener("deviceready", onDeviceReady, false);

	    function onDeviceReady() {
	        var element = document.getElementById('device-uuid');
	        element.innerHTML = ('Device UUID: ' + device.uuid + '');
	    }*/
		
		
	});
});

module.controller('MenuController', function($scope, $http, $compile, localStorageService) {
	ons.ready(function() {
		
		var json = (function () {
			var json = null;
			$.ajax({
				'type':'GET',
				'async': false,
				'global': false,
				'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
				'dataType': "json",
				'data': $.param({ 
					get_toilets: "all"
				}),
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		
		
		
		for (var i = 0; i < json.length; i ++) {
			
			var data = json[i];
			
			var element = document.getElementById("list-view");
			
			if (data.type == 1 && data.rating <= 1)  {						
				var image = "img/markerbadicon.png"
			} else if (data.type == 1 && data.rating <= 3)  {						
				var image =  "img/markermediumicon.png"
			} else if (data.type == 1 && data.rating >= 4)  {						
				var image =  "img/markergoodicon.png"
			} else if (data.device_id == device.uuid)  {						
				var image =  "img/markeraddicon.png"
			}   
			
			if (data.rating == 1)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 2)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 3)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 4)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 5)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon active ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} else if (data.rating == 0)  {						
				var rating_star =	'<ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon><ons-icon icon="ion-star" class="tab-icon ons-icon ons-icon--ion ion-star fa-lg"></ons-icon>';
			} 
								
			/*var profile_address = data.address;
		        	
			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			// Retrieve the start and end locations and create
			// a DirectionsRequest using WALKING directions.
			directionsDisplay.setMap($scope.map);
			
			var myLatlng = new google.maps.LatLng(localStorage.getItem("latitude"), localStorage.getItem("longitude"));
			 
			var request = {
				origin: myLatlng,
				destination: profile_address,
				travelMode: google.maps.TravelMode.WALKING
			};
			
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
			    	directionsDisplay.setDirections(response);
					var distance = response.routes[0].legs[0].distance.text;
			    }
										
			});*/
									
			var listData =
				'<ons-list-item modifier="tappable chevron" class="list-item-container list__item ons-list-item-inner list__item--chevron" ng-click="pushPage(' + data.id + ')">' +
				    '<ons-row class="row ons-row-inner">' +
					    '<ons-col width="35%"><img src=' + image + ' class="col ons-col-inner thumbnail" /></ons-col>' +
					    '<ons-col width="50%" class="col ons-col-inner">' +
						    '<div class="name">' + data.name + '</div>' +
						    '<div class="location"><i class="fa fa-map-marker"></i> ' + data.address + '</div>' +
						    '<div class="desc">' + rating_star + '</div>' +
					    '</ons-col>' +
					    '<ons-col width="25%" class="col ons-col-inner"></ons-col>' +
				    '</ons-row>' +
			    '</ons-list-item>'									
			;
				
			var compiledData = $compile(listData)($scope);

			$(element).append(compiledData[0]);
			
			
					
		}
		
	
			
		function onError(error) {
			alert("message: " + error.message);
			localStorage.setItem("message", error.message);
		}
		
		$scope.pushPage = function(id) {
			
			var json = (function () {
				var json = null;
				$.ajax({
					'type':'GET',
					'async': false,
					'global': false,
					'url': "http://marijnstuyfzand.nl/mia6/handyfriendly/www/php/get_marker.php",
					'dataType': "json",
					'data': $.param({ 
						get_profile: id
					}),
					'success': function (data) {
						json = data;
					}
				});
				return json;							
			})();
									
			var profile_id = json.variables.id;
			
			localStorage.setItem("profile_id", profile_id);
			
			mapNavigator.pushPage("marker.html", { animation : "slide" }, menu.close());
				
		};
	
	});
});