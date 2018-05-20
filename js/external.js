// Name: Kai Ho Chan
// Filename: external.js
// Description: In this app, I create an iTunes artist search program using
// the iTunes search API.
//
// While working well on other browsers, only Safari pops out an error, "Origin
// http://localhost is not allowed by Access-Control-Allow-Origin."
//

'use strict';

let countrySearch = 'country=US';
let mediaSearch = 'media=music';
let entitySearch = 'entity=musicTrack';
let limitSearch = 'limit=20';


// getString() function
// Get user input and parse into a http link
function getString(searchTerm) {
    var url = 'https://itunes.apple.com/search?' + searchTerm + '&' + countrySearch
                +'&' + mediaSearch +'&' + entitySearch + '&' + limitSearch;
    return url;
}

// createTracksThumb() function
// Translate data into variables and then call createDom() to
// create a html DOM;
function createTracksThumb(data) {
    var artistName = data.artistName;
    var collectionCensoredName = data.collectionCensoredName;
    var trackCensoredName = data.trackCensoredName;
    var artistViewUrl = data.artistViewUrl;
    var collectionViewUrl = data.collectionViewUrl;
    var trackViewUrl = data.trackViewUrl;
    var previewUrl = data.previewUrl;
    var artworkUrl100 = data.artworkUrl100;
    var collectionPrice = data.collectionPrice;
    var trackPrice = data.trackPrice;
    var currency = data.currency;
    var primaryGenreName = data.primaryGenreName;
    return createDOM(artistName, collectionCensoredName, trackCensoredName, artistViewUrl,
        collectionViewUrl, trackViewUrl,previewUrl, artworkUrl100, collectionPrice, trackPrice, currency,
        primaryGenreName);
}

// createDOM()
// Translate variables into html DOM;
function createDOM(artistName, collectionCensoredName, trackCensoredName, artistViewUrl,
    collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, trackPrice, currency,
    primaryGenreName) {
    var html = '';
    html += '<div class="row">' +
    '<div class="column left">' +
    '<p>Track:</p><p>Track Price</p><p>Artist</p>' +
    '<p>Collection:</p>' + '<p>Collection Price:</p>' +
    '<p>Primary Genre</p>' +
    '</div><div class="column middle"><p>' + trackCensoredName +
    '<a class="with-space" href="' + previewUrl + '">Preview</a>' +
    '<a class="with-space" href="' + trackViewUrl + '">Full Song</a><p>' +
    trackPrice + " " + currency + '</p><p>'+  '<a href="'+ artistViewUrl +
    '">' + artistName + '</a></p><p><a href="' + collectionViewUrl + '">' +
    collectionCensoredName + '</a></p><p>' + collectionPrice + " " + currency +
    '</p><p>' + primaryGenreName + '</p></div><div class="column right">' +
    '<img src="' + artworkUrl100 + '">' + '</div></div><div><br></div>';
    $(".preview").append(html);
}

// Add Listener to the html search form;
// Once submit form, browser will send request to iTunes api
// and then translate the response into html DOM.
$("#itunes-search-form").submit(function(e) {
    let searchText = encodeURIComponent($("#itunes-search-field").val());
    console.log(searchText);
    e.preventDefault();
    var params = 'term=' + searchText;
    var html = getString(params);
    // getJSON
    $.getJSON(html ,function(response){
        $(".preview").html("");
        console.log(response);
        response.results.forEach(function(data) {
            return createTracksThumb(data);
        });
    });
});
