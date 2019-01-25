require("dotenv").config();

const keys = require("./keys.js");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const request = require('request');

const userInput = process.argv[3];
const commandForLiri = process.argv[2];

//Commands to give Liri via your terminal

function commands(commandForLiri, userInput) {
    switch (commandForLiri) {
        case "spotify-this-song":
            spotify(userInput);
            break;

        case "movie-this":
            movie(userInput);
            break;

        case "do-what-it-says":
            doit();
            break;

        case "concert-this":
            bit(userInput);
            break;

        default:
            console.log("Please enter a valid command: spotify-this-song, movie-this, do-what-it-says, concert-this")
    }
}

function spotify(nameOfSong) {
    const spotify = new Spotify(keys.spotify);

    if (!nameOfSong) {
        nameOfSong = 'The Sign';
    };
    console.log(nameOfSong);

    spotify.search({
        type: 'track',
        query: nameOfSong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url);

        const loggingSong = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\n";

        fs.appendFile("log.txt", loggingSong, function (err) {
            if (err) throw err;
        });

        resultsLog(data);
    });
};

function movie(movieName) {
    if (!movieName) {
        movieName = "Mr Nobody";
    }

    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=f00a62a8";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let movieObject = JSON.parse(body);

            let movieResults =
                "------------------------------ begin ------------------------------" + "\r\n" +
                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "------------------------------ end ------------------------------" + "\r\n";
            console.log(movieResults);

            fs.appendFile("log.txt", movieResults, function (err) {
                if (err) throw err;
            });
            console.log("Saved!");
            logResults(response);
        } else {
            console.log("Error: " + error);
            return;
        }
    });
};

commands(commandForLiri,userInput);