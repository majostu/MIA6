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

var module = angular.module('handyfriendly', ['onsen']);

module.controller('AppController', function($scope) { 
	ons.ready(function() {
		
	});
});

module.controller('MapController', function($scope, $compile) {
	ons.ready(function() {
			    
	    var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "/php/getdata.php",
				'dataType': "json",
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
				var iconBase = 'img/';
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'Mijn locatie',
					optimized: false,
					icon: iconBase + 'wheelchair.png'
		    	});
		
				/*google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
		    	});*/
		    			    	
		    	var oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true, markersWontHide: true, keepSpiderfied: true, nearbyDistance: 20, legWeight: 1});
				var infoWindow = new google.maps.InfoWindow();
				
				for (var i = 0; i < json.length; i ++) {
					var data = json[i];
					var loc = new google.maps.LatLng(data.latitude, data.longitude);
					var iconBase = 'img/';
					if (data.type == 1 && data.rating <= 1)  {						
						var marker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							icon: iconBase + 'markerbad.png'
						});	
					} else if (data.type == 1 && data.rating <= 3)  {						
						var marker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							icon: iconBase + 'markermedium.png'
						});	
					} else if (data.type == 1 && data.rating >= 4)  {						
						var marker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							icon: iconBase + 'markergood.png'
						});	
					} else if (data.type == 2)  {						
						var marker = new google.maps.Marker({
							position: loc,
							title: data.jobtitle,
							map: map,
							icon: iconBase + 'markeradd.png'
						});	
					}	
					
					marker.desc = data.name;
					oms.addMarker(marker);
					infoBox(map, marker, data);
				}
		
				function infoBox(map, marker, data) {
					oms.addListener('click', function(marker, event) {
						infoWindow.setContent(marker.desc);
						infoWindow.open(map, marker);
					});
			
					oms.addListener('spiderfy', function(markers) {
						infoWindow.close();
					});
			
					(function(marker, data) {
						google.maps.event.addListener(marker, "click", function(e) {		
										
								var contentString = 
									'<div id="map-info-window">'+
										'<div id="map-info-window-inner">'+
											'<p><b>'+ data.name +'</b></p>'+
											'<p>' + data.address + ', ' + data.zip +', ' + data.city +', ' + data.country +'</p>' +
											'<ul>' +
												'<li><i class="ion-star active"></i></li>' +
												'<li><i class="ion-star active"></i></li>' +
												'<li><i class="ion-star"></i></li>' +
												'<li><i class="ion-star"></i></li>' +
												'<li><i class="ion-star"></i></li>' +
											'</ul>' +
											'<p><button><i class="fa fa-compass"></i> Routebeschrijving</button>'+
											'<button ng-click="mapNavigator.pushPage("marker.html", { animation : "slide" })"><i class="fa fa-info-circle"></i> Informatie</button></p>'+
										'</div>'+
									'</div>'									
								;

							infoWindow.setContent(contentString);
							infoWindow.open(map, marker);
						});
					})(marker, data);
  				}
		    	
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
	            
	            $scope.map = new google.maps.Map(document.getElementById("map_add_marker"), myOptions); 
	            
	            var contentString = "<div><a ng-click='clickTest()'>Mijn locatie</a></div>";
				var compiled = $compile(contentString)($scope);
		
				var infowindow = new google.maps.InfoWindow({
					content: compiled[0]
		    	});
		    	
		    	
		    	var iconBase = 'img/';
								
				var marker = new google.maps.Marker({
					position: latlng,
					map: $scope.map,
					title: 'Mijn locatie',
					optimized: false,
					icon: iconBase + 'wheelchair.png'
		    	});
		
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open($scope.map,marker);
		    	});
	            
	            $scope.overlay = new google.maps.OverlayView();
	            $scope.overlay.draw = function() {}; // empty function required
	            $scope.overlay.setMap($scope.map);
	            $scope.element = document.getElementById('map_add_marker');
	            $scope.hammertime = Hammer($scope.element).on("doubletap", function(event) {
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
					
					var iconBase = 'img/';
		            var marker = new google.maps.Marker({
		                position: coordinates,
		                map: $scope.map,
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
	                                ons.notification.alert({
		                                messageHTML: '<div><ons-icon icon="fa-check" style="color:#25c2aa; font-size: 28px;"></ons-icon></div>',
										title: 'WC toegevoegd',
										buttonLabel: 'OK'
	                                });
	                                break;
	                        }
	                    }
	                });
		            		
		            $timeout(function(){
		                //Creation of the listener associated to the Markers click
			            google.maps.event.addListener(marker, "click", function (e) {
			                ons.notification.confirm({
			                    message: 'Weet je zeker dat je deze wc locatie wilt verwijderen?',
			                    callback: function(idx) {
			                        switch(idx) {
			                            case 0:
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
				                                messageHTML: '<div><ons-icon icon="fa-ban" style="color:#9d0d38; font-size: 28px;"></ons-icon></div>',
												title: 'WC verwijderd',
												buttonLabel: 'OK'
			                                });
			                                break;
			                        }
			                    }
			                });   
			            });
		            },1000);
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

module.controller('CommentController', function($scope) {
	ons.ready(function() {
		
		$scope.rating1 = 1;
  		$scope.isReadonly = true;
  		$scope.rateFunction = function(rating) {
  			console.log("Rating selected: " + rating);
  		};
		
	});
});

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

module.controller('SettingsController', function($scope) {
	ons.ready(function() {
		
		
		document.addEventListener("deviceready", onDeviceReady, false);

	    function onDeviceReady() {
	        var element = document.getElementById('device-uuid');
	        element.innerHTML = ('Device UUID: ' + device.uuid + '');
	    }
		
		
	});
});