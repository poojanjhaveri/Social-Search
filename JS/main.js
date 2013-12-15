// JavaScript Document

var app = angular.module('social-search-app',[]);
app.controller('SocialSearchController',function($scope,instagram,twitter,facebook)
{
	
	$scope.search=function()
	{
		var tag = $scope.searchtext;
		var instagrampromise = instagram.search(tag);
		
		instagrampromise.then(function(response)
		{
			var images = response.data.data;
			console.log(images);
			$scope.images=images;
			$scope.loading=false;
		});
		
		var twitterpromise = twitter.search(tag);
		twitterpromise.then(function(response)
		{
			console.log(response.data);
			$scope.tweets=response.data.statuses;
			
		});
		
		var facebookpromise = facebook.search(tag);
		facebookpromise.then(function(response)
		{
			console.log(response.data.data);
			var container = document.querySelector('#basic');
 			var msnry = new Masonry( container, {
   			 columnWidth: 45,
			 "isFitWidth": true,
			 isInitLayout: false
  			});
			
			msnry.layout();
		});
		
		
		
	}

});

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