<?php 

/**
 * GET search/tweets
 * https://dev.twitter.com/docs/api/1.1/get/search/tweets
 */

require_once 'credentials.php';
require_once 'Twitter/Base.php';
require_once 'Twitter/Search.php';

$tagsearch = $_GET['tagsearch'];


$twitter = new Twitter\Search(array(
	'consumer_key' => CONSUMER_KEY,
	'secret' => SECRET
));

$json = $twitter->authenticate()->get('search/tweets', array(
	'q' => '%23'.$tagsearch,
	'result_type'=>'recent'
));

echo $json;
// echo $twitter->getLastUrl();