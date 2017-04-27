/* global GamesManager */
var gamesManager = null; //eslint-disable-line no-unused-vars
$(document).ready(function () {
    gamesManager = new GamesManager(); 

    log.init(document.getElementById("log"));

    ko.applyBindings(gamesManager);
});