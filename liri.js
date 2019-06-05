var fs = require("fs");
var axios = require("axios");

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
var divider = "\n--------------------\r\n";


if (command === "concert-this") {
    fetchConcert(query);
} else if (command === "spotify-this-song") {
    fetchSpotify(query);
} else if (command === "movie-this") {
    fetchMovie(query);
} else if (command === "do-what-it-says") {
    fetchdoWhatItSays(query);
} else {
    console.log("Command not recognized! Please try again.")
};


function fetchConcert() {

    var artist = query;

    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {

        console.log(JSON.stringify(response));

    });

};

function fetchSpotify() {

    var songName;

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var matchedTracks = [];
        var dataItems = data.tracks.items;

        for (var i = 0; i < 20; i++) {
            if (data.tracks.items[i].name == songName) {
                matchedTracks.push(i);
            }
        }

        console.log(matchedTracks.length + " tracks found that match your query.");
        appendFile(matchedTracks.length + " tracks found that match your query.");

        if (matchedTracks.length > 0) {
            console.log("Track: " + dataItems[matchedTracks[0]].name);
            console.log("Artist: " + dataItems[matchedTracks[0]].artists[0].name);
            console.log("Album: " + dataItems[matchedTracks[0]].album.name);
            console.log("Spotify link: " + dataItems[matchedTracks[0]].external_urls.spotify);

            appendFile("Track: " + dataItems[matchedTracks[0]].name);
            appendFile("Artist: " + dataItems[matchedTracks[0]].artists[0].name);
            appendFile("Album: " + dataItems[matchedTracks[0]].album.name);
            appendFile("Spotify link: " + dataItems[matchedTracks[0]].external_urls.spotify);
        }
        else if (matchedTracks.length == 0) {
            console.log("Sorry, but spotify does not contain that song in their database :(");
            appendFile("Sorry, but spotify does not contain that song in their database :(");
        }

    });

};

function fetchMovie(movieName) {

    if (movieName == null) {
        movieName = "Mr. Nobody";
    }

    var URL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function (response) {

        console.log("---------------------------------------------");
        console.log("The movie's title is: " + response.data.Title);
        console.log("The movie's release year is: " + response.data.Year);
        console.log("The movie's rating is: " + response.data.Rated);
        console.log("The movie's was produced in: " + response.data.Country);
        console.log("The movie's language is: " + response.data.Language);
        console.log("The movie's plot: " + response.data.Plot);
        console.log("The movie's actors: " + response.data.Actors);
        console.log("The movie's Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
        console.log("The movie's Rotten Tomatoes URL: " + response.data.Website);

        var movieData = [
            "Title: " + response.data.Title,
            "Year Released: " + response.data.Year,
            "Movie Rating: " + response.data.Rated,
            "Country Produced: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors: " + response.data.Actors,
            "Rotten Tomatoes Rating: " + response.data.Ratings[2].Value,
            "Website: " + response.data.Website,
        ];

        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
        });
    });
};







