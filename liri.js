var apiKeys = require("");
var twitter = require("twitter");
var spotify = require ("spotify");
var request = require("request");

//twitter node function

var Twitter = require('twitter');

var GetMyTweets = function () {
var client = new Twitter({
 consumer_key: 'keys.twitterKeys.consumer_key',
 consumer_secret: 'keys.twitterKeys.consumer_secret',
 access_token_key: 'keys.twitterKeys.access_token_key',
 access_token_secret: 'keys.twitterKeys.access_token_secret'
});

var params = {screen_name: 'ariez84'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
    var data = []; 
    for (var i = 0; i < tweets.length; i++) {
        data.push({
        'created at: ' : tweets[i].created_at,
        'Tweets: ' : tweets[i].text,
          });
        }
 }
});

//function for spotify

var getArtistNames = function(artist) {
  return artist.name;
};


var getMeSpotify = function(songName) {
  if (songName === undefined) {
    songName = "Somebody told me";
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; 

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
    
  });
};


//function for omdb

var getMeMovie = function(movieName) {
  
    if (movieName === undefined) {
      movieName = movieName.trim();
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = [];
        var jsonData = JSON.parse(body);
  
        data.push({
        'Title: ' : jsonData.Title,
        'Year: ' : jsonData.Year,
        'Rated: ' : jsonData.Rated,
        'IMDB Rating: ' : jsonData.imdbRating,
        'Country: ' : jsonData.Country,
        'Language: ' : jsonData.Language,
        'Plot: ' : jsonData.Plot,
        'Actors: ' : jsonData.Actors,
        'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
        'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
    });
        console.log(data);

}
});
  }

//hey liri function

var heyLiri = function () {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });
}

var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      GetMyTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      heyLiri();
      break;
    default:
      console.log("Liri don't understand");
  }
}