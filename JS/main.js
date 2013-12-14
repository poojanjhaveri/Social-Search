// JavaScript Document

var app = angular.module('social-search-app',[]);
app.controller('SocialSearchController',function($scope,$http)
{
	
	$scope.search=function()
	{
		console.log('Poojan');
		var tag = $scope.searchtext;
		$scope.loading=true;
		
		
		console.log('Poojan');
		var url ="https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=5a2cc9851c0f45f79561803af05a97f6&callback=JSON_CALLBACK"
		var promise = $http.jsonp(url);
		promise.then(function(response)
		{
			var images = response.data.data;
			console.log(images);
			$scope.images=images;
			$scope.loading=false;
			
		});
	}

});
