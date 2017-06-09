var requirejs = require('requirejs');

requirejs.config({

    baseUrl: process.cwd() + '/web',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        'jquery.validate': 'bower_components/jquery-validation/dist/jquery.validate.min',
        ko: 'bower_components/knockout/dist/knockout',
        moment: 'bower_components/moment/min/moment.min',
        sprintf: 'bower_components/sprintf/src/sprintf',
        text: 'bower_components/text/text',
        msgpack: 'bower_components/msgpack-lite/dist/msgpack.min'
    },
    nodeRequire: require

});

var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function (context) {
    requirejs(['scripts/classes/GamesManager'], function (GamesManager) {

        var setWorldConstructor = context.setWorldConstructor;

        console.log("~ Setting up world-constructor for CogworkMTGTracker tests ~");

        //setup World    
        var cogWorkMtgTrackerWorld = function () {

            this.gamesManager = new GamesManager();
            this.cache = {};
            this.stack = [];

        };

        setWorldConstructor(cogWorkMtgTrackerWorld);

    });

});