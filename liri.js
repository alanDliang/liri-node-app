var apiKeys = require("");
var twitter = require("twitter");
var spotify = require ("spotify");
var request = require("request");

//twitter node function

var Twitter = require('twitter');

var client = new Twitter({
 consumer_key: '',
 consumer_secret: '',
 access_token_key: '',
 access_token_secret: ''
});

var params = {screen_name: 'ariez84'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
    var data = []; //empty array to hold data
    for (var i = 0; i < tweets.length; i++) {
        data.push({
        'created at: ' : tweets[i].created_at,
        'Tweets: ' : tweets[i].text,
          });
        }
 }
});

