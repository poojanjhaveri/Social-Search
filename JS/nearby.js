(function(){
	
	
window.App={
	GoogleMaps:{	
			initialize:function()
			{
				 var cities={};
   				 cities['losangeles']=[34.082237,-118.247437];
    
				  var map = new google.maps.Map(document.getElementById('map'),{
					  zoom:13,
					  center:new google.maps.LatLng(cities['losangeles'][0],cities['losangeles'][1]),
					  mapTypeId:google.maps.MapTypeId.ROADMAP
        			});
					this.$map=map;
					var infowindow = new google.maps.InfoWindow();
					this.$infowindow=infowindow;
					this.$directionsService = new google.maps.DirectionsService();
					this.$directionsDisplay = new google.maps.DirectionsRenderer();
					this.$currentposition= cities['losangeles'];
					
				 this.getLocation();	
				 this.bindEventListeners();
			},
			
			getLocation:function()
			{
				
			var self = this;

			if (navigator.geolocation) { //Feature detection
			// Geolocation supported. Do something here.
		
				var success_handler = function(position) {
					
					$('#trackLocation').hide();
					
					
					
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					self.$currentlocation = latlng;
					App.InstagramRequest.getPhotos(position.coords.latitude,position.coords.longitude);
					self.$map.setCenter(latlng);
					var marker = new google.maps.Marker({
					  title:"Current Location",
					  position: latlng,
					  icon:'http://youarehere.fogplex.org/arrow/arrow-trans128x128.png',
					  map: self.$map
				  });
				  marker.setMap(self.$map);
			};
			
			var error_handler = function(err)   {
			document.getElementById('trackLocation').innerHTML="Sorry, GeoLocation is not supported by your browser. This works bests in Chrome or Safari";
			};
			var options = {};
			navigator.geolocation.getCurrentPosition(success_handler, error_handler, options);
			
			
			
			
			}
			
			
				
			},
			
			renderInstagramPhotos:function(response)
			{
				var self = this;
				self.$map.setZoom(16);
				console.log(response);
				var i,marker;
				for(i=0;i<response.data.length;i++)
				{
					var photo = response.data[i];
					
					var latlng = new google.maps.LatLng(photo.location.latitude,photo.location.longitude);
					var caption="";
					if(photo.caption!=null)
					{
						caption = photo.caption.text;
					}
					
					
					marker = new google.maps.Marker({
					  title:caption,
					  position: latlng,
					  icon:new google.maps.MarkerImage(
						  photo.images.thumbnail.url,
						  null, 
						  null, 
						  null,
						  new google.maps.Size(60, 60)
					  )  ,
					  map: self.$map
				  });
				  marker.setMap(self.$map);
				  App.GoogleMaps.openMarkerInstagram(marker,photo);
				}
				
				
				
				
				
				
				
				
			},
			openMarkerInstagram:function(markerobject,photo)
			{
				var self = this;
				google.maps.event.addListener(markerobject, 'click', function() {
					 
					App.GoogleMaps.showDirections(markerobject);
					 
					 self.$infowindow.setContent('<div><iframe src="'+photo.link+'embed/" width="300" height="300" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div><a href="http://maps.google.com/?saddr='+self.$currentlocation.nb+','+self.$currentlocation.ob+'&daddr='+photo.location.latitude+','+photo.location.longitude+'" target=_new>Directions</a>');
					 
					  self.$infowindow.open(self.$map,markerobject);
					  
  				});
			},
			
			showDirections:function(markerobject) {

				var self= this;

				var start = self.$currentlocation;
				var end = markerobject.position;
			
				this.$directionsDisplay.setMap(self.$map); 
			
				var request = {
					origin : start,
					destination : end,
					travelMode : google.maps.TravelMode.WALKING
				};
				self.$directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						console.log(response);
						self.$map.preserveViewport=true;
						self.$directionsDisplay.setDirections(response);
					
					}
					
				self.$infowindow.setContent(self.$infowindow.getContent() +'<div>'+response.routes[0].legs[0].distance.text+'</div>');
					
				});
			},
			
			bindEventListeners:function()
			{
				var self = this;
			 $('#search').on('click',function(event){
				event.preventDefault();
				var searchTerm = $('#searchlocation').val();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					address:searchTerm
					},function(results,status){
						
						
					if (status == google.maps.GeocoderStatus.OK) {
						
						var latlng = results[0].geometry.location;
						self.$currentlocation=latlng;
						self.$map.setCenter(latlng);
					
						var marker = new google.maps.Marker({
						  title:"Searched Location",
						  position: latlng,
						  icon:'http://youarehere.fogplex.org/arrow/arrow-trans128x128.png',
						  map: self.$map
					  });
					  marker.setMap(self.$map);
						
						App.InstagramRequest.getPhotos(latlng.nb,latlng.ob);
					}
					else {
        						alert("Geocoder failed due to: " + status);
      					}
					
						});
				   });
			}
			
			
			
			
		
	},
	
	
	InstagramRequest:{
		getPhotos:function(lat,long)
		{
			
			$('#trackLocation').html('Loading images');
			
			$.ajax({
					url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+long+"&distance=1000&client_id=5a2cc9851c0f45f79561803af05a97f6&callback=JSON_CALLBACK",
		  			type:"get",
					dataType:"jsonp",
					success: function(json){
						console.log(json);
						App.GoogleMaps.renderInstagramPhotos(json);
						
						}
		  });
			
			
			
		}
		
		
	}
}
	
    
  
 
App.GoogleMaps.initialize();
    
})();