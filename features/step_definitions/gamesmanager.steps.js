'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');

defineSupportCode(function (context) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;

    Given('there are already {int} games registered', function (int, callback) {
        for (var i = 0; i < int; i++){
            this.gamesManager.startGame();
        };
        
        callback(null);
    });

    When('a game starts', function (callback) {
        this.gamesManager.startGame();

        callback(null);
    });

    When('a game {name} starts', function (name, callback) {
        this.gamesManager.startGame(name);

        callback(null);
    });

    Then('there are {int} games registered', function (int, callback) {
        assert.equal(int, this.gamesManager.games().length);
         
        callback(null);
    });


    When('game {name} is removed', function (name, callback) {
        this.gamesManager.removeGameByName(name);

        callback(null);
    });

    Then('there is a game {name} registered', function (name, callback) {
        var game = this.gamesManager.findGameByName(name);
        assert.notEqual(game, null);

        callback(null);
    });

    Then('there is no game {name} registered', function (name, callback) {
        var game = this.gamesManager.findGameByName(name);
        assert.equal(game, null);
        
        callback(null);
    });

    When('the primary game is retrieved', function (callback) {
        this.primaryGameResult = this.gamesManager.getPrimaryGame();
        callback(null);
    });

    Then('a game was returned as primary game', function (callback) {
        assert.notEqual(this.primaryGameResult, null);

        callback(null);
    });

    Then('game {name} was returned as primary game', function (name, callback) {
        assert.equal(this.primaryGameResult.name(), name);

        callback(null);
    });

});