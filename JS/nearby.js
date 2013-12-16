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
				 this.getLocation();	
			},
			
			getLocation:function()
			{
				
			var self = this;

			if (navigator.geolocation) { //Feature detection
			// Geolocation supported. Do something here.
		
				var success_handler = function(position) {
					
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					App.TwitterRequest.getTweets(position.coords.latitude,position.coords.longitude);
					self.$map.setCenter(latlng);
					var marker = new google.maps.Marker({
					  title:"Current Location",
					  position: latlng,
					  icon:'http://www.ekit.com/default/images/icon_map_current_location',
					  map: self.$map
				  });
				  marker.setMap(self.$map);
			};
			
			var error_handler = function(err)   {
			document.getElementById('error').innerHTML="Sorry, GeoLocation is not supported by your browser. This works bests in Chrome or Safari";
			};
			var options = {};
			navigator.geolocation.getCurrentPosition(success_handler, error_handler, options);
			}
			
			
				
			},
			
			renderTweets:function(response)
			{
				var self = this;
				
				console.log(response);
				var i,marker;
				for(i=0;i<response.statuses.length;i++)
				{
					
					
					var latlng = new google.maps.LatLng(response.statuses[i].geo.coordinates[0],response.statuses[i].geo.coordinates[1]);
					
					
					marker = new google.maps.Marker({
					  title:response.statuses[i].text,
					  position: latlng,
					  icon:'http://www.ekit.com/default/images/icon_map_current_location',
					  map: self.$map
				  });
				  marker.setMap(self.$map);
				}
				
			}
			
		
	},
	
	
	TwitterRequest:{
		getTweets:function(lat,long)
		{
			console.log(lat);
			console.log(long);
			
			$.ajax({
					url: 'twitter-library/search-tweetsstream.php?lat='+lat+'&long='+long,
		  			type:"get",
					dataType:"json",
					success: function(json){
						App.GoogleMaps.renderTweets(json);
						
						
						}
		  });
			
			
			
		}
		
		
	}
}
	
    
   
		
  
  
 


   $('#search').on('click',function(){
        
        var searchTerm = $('#search-term').val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address:searchTerm
            },function(results,status){
                var latlng = results[0].geometry.location;
                var marker = new google.maps.Marker({
                            position:latlng
                            });
                
                marker.setMap(map);
                
                });
 });
 
App.GoogleMaps.initialize('#payment-form');
    
})();