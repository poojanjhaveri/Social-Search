<?php 

/**
 * GET search/tweets
 * https://dev.twitter.com/docs/api/1.1/get/search/tweets
 */

require_once 'credentials.php';
require_once 'twitter/Base.php';
require_once 'twitter/Search.php';

$lat = $_GET['lat'];
$long = $_GET['long'];
$radius = '5mi';

$twitter = new Twitter\Search(array(
	'consumer_key' => CONSUMER_KEY,
	'secret' => SECRET
));

$json = $twitter->authenticate()->get('search/tweets', array(
	'q'=>'',
	'result_type'=>'recent',
	'geocode'=>strval($lat).','.strval($long).','.'10mi',
	
));

echo $json;
// echo $twitter->getLastUrl();