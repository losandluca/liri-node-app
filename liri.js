require("dotenv").config();

const keys = require("./keys.js");
const fs = require("fs");
const spotify = require("node-spotify-api");
const request = require('request');

const userInput = process.argv[3];
const commandForLiri = process.argv[2];

//Commands to give Liri via your terminal

function commands (commandForLiri, userInput){
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

    if(!nameOfSong) {
        nameOfSong = 'The Sign';
    };
    console.log(nameOfSong);

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
}