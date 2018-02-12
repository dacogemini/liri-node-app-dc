//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

require('dotenv').config()
// var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
// var omdb = require('omdb');
var keys = require('./key.js')


if (process.argv[2] === "my-tweets") {

    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'dacogemini'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {

          for (var i = 0; i < tweets.length; i++) {

              var twitterResults =
                  "@" + tweets[i].user.screen_name + ": " +
                  tweets[i].text + "\r\n" +
                  tweets[i].created_at + "\r\n" +
                  "-------------------------------------------------------------" + "\r\n";
                  console.log(twitterResults);

           };

      }
     });
   }