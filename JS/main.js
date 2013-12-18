// JavaScript Document

var app = angular.module('social-search-app',[]);


app.controller('SocialSearchController',function($scope,instagram,twitter,facebook)
{
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		
		
		// Update the layout for all masonry cards
		
    	var container = document.querySelector('#basic');
 			var msnry = new Masonry( container, {
		//	"isFitWidth": true,
			});
			
			
			
			var container = document.querySelector('#basictwitter');
 			var msnry = new Masonry( container, {
			"isFitWidth": true,
			});
		
			var container = document.querySelector('#basicfacebook');
 			var msnry = new Masonry( container, {
			"isFitWidth": true,
			});
		
		
		
 })


	// Function that is triggered when something is searched
	$scope.search=function()
	{
		
		var tag = $scope.searchtext;
		
		var instagrampromise = instagram.search(tag.replace('#',''));		// For instagram replace # by '' as instagram API allows searching without #
		
		instagrampromise.then(function(response)
		{
			var images = response.data.data;
			console.log(images);
			$scope.images=images;											// Pass it to the scope
			$scope.loading=false;
			
			
		
 			
			
			

		});
		
		var twitterpromise = twitter.search(tag);
		twitterpromise.then(function(response)
		{
			console.log(response.data);
			$scope.tweets=response.data.statuses;							// Pass Tweets Json to scope
			
		});
		
		var facebookpromise = facebook.search(tag.replace('#',''));
		facebookpromise.then(function(response)
		{
			
			$scope.posts=response.data.data;								// PAss post json data to scope
			console.log(response.data.data);
			var container = document.querySelector('#basic');
 			var msnry = new Masonry( container, {
			"isFitWidth": true,
			});
			
			var container = document.querySelector('#basictwitter');
 			var msnry = new Masonry( container, {
		//	"isFitWidth": true,
			});	
		});
		var container = document.querySelector('#basicfacebook');
 			var msnry = new Masonry( container, {
			"isFitWidth": true,
			});
		
	}
	
	

});


// Service to request photos from Instagram API
app.service('instagram',function($http)
{
	this.search=function(tag)
	{
	console.log("tag is "+tag);
	var url ="https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=5a2cc9851c0f45f79561803af05a97f6&callback=JSON_CALLBACK"
	var promise = $http.jsonp(url);
	return promise;
	};
});

// Service to request photos from Twitter API
app.service('twitter',function($http)
{
	this.search=function(tag)
	{
	console.log("twitter tag is "+tag);
	var url ='twitter-library/search-tweets.php?tagsearch='+tag;
	var promise = $http.get(url);
	return promise;
	};
});

// Service to request photos from Facebook API
app.service('facebook',function($http)
{
	this.search=function(tag)
	{
	console.log("facebook tag is "+tag);
	var url ='https://graph.facebook.com/search?q='+tag+'&type=post&access_token=176722432536602|7c566fd78b59bb8c8029dca77405f4c7&callback=JSON_CALLBACK'
	var promise = $http.jsonp(url);
	return promise;
	};
});
