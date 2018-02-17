//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

require('dotenv').config()
var Spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var omdb = require('omdb');
var keys = require('./keys.js')

// TWITTER ===========================
if (process.argv[2] === "my-tweets") {

    var client = new twitter(keys.twitter);

    var params = {
        screen_name: 'tercera_casa'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
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
// SPOTIFY ====================================
function spotify () {  // Reusing Code -- Template

if (process.argv[2] === "spotify-this-song") {
    var songTitle = process.argv[3] ? process.argv[3] : "'The Sign' by Ace of Base";
    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songInfo = data.tracks.items
        for (var i = 0; i < songInfo.length; i++) {

            var spotifyResults =
                "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                "Song: " + songInfo[i].name + "\r\n" +
                "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                "-------------------------------------------------------------" + "\r\n";
            console.log(spotifyResults);

        }
    });
}
}
spotify(); // A function runs where it is placed
// OMBD ===============================

if (process.argv[2] === "movie-this") {
    var movie = process.argv[3] ? process.argv[3] : "Mr. Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    var request = require("request");
    request(queryUrl, function (error, response, body) {

        if (error) {
            console.log(error);
        } 
        else  {
            
            console.log("Year: " + JSON.parse(body).Year + "\r\n");
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating + "\r\n");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\r\n")
            console.log("Country: " + JSON.parse(body).Country + "\r\n");
            console.log("Language: " + JSON.parse(body).Language + "\r\n");
            console.log("Plot: " + JSON.parse(body).Plot + "\r\n");
            console.log("Actors: " + JSON.parse(body).Actors + "\r\n");
            console.log("-------------------------------------------------------------" + "\r\n");
    

        };
    });
};
if (process.argv[2] === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(","); // Random txt
            console.log(dataArr);
    
            process.argv[2] = dataArr[0]; 
            process.argv[3] = dataArr[1];
            spotify();
    });
};
