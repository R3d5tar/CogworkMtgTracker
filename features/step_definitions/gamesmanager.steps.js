'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');

defineSupportCode(function (context) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;

    Given('there are already {int} games registered', function (int, callback) {
        for (var i = 0; i < int; i++) {
            this.gamesManager.startGame();
        };

        callback(null);
    });

    When('a game starts', function (callback) {
        this.cache.game = this.gamesManager.startGame();

        callback(null);
    });

    When('a game {name} starts', function (name, callback) {
        this.cache.game = this.gamesManager.startGame(name);

        callback(null);
    });

    Then('there are {int} games registered', function (int, callback) {
        assert.equal(int, this.gamesManager.getGames().length);

        callback(null);
    });


    When('game {name} is removed', function (name, callback) {
        this.gamesManager.removeGameByName(name);

        callback(null);
    });

    Then('there is a game {name} registered', function (name, callback) {
        var game = this.gamesManager.findGameByName(name);
        assert.notEqual(game, null);
        this.cache.game  = game;
        callback(null);
    });

    Then('there is no game {name} registered', function (name, callback) {
        var game = this.gamesManager.findGameByName(name);
        assert.equal(game, null);
        callback(null);
    });

    When('the primary game is retrieved', function (callback) {
        this.cache.primaryGameResult = this.gamesManager.getPrimaryGame();
        this.cache.game  = this.cache.primaryGameResult;
        callback(null);
    });

    Then('a game was returned as primary game', function (callback) {
        assert.notEqual(this.cache.primaryGameResult, null);

        callback(null);
    });

    Then('game {name} was returned as primary game', function (name, callback) {
        assert.equal(this.cache.primaryGameResult.name(), name);

        callback(null);
    });

    When('a game {name} starts with a starting life total of {life}', function (name, life, callback) {
        this.cache.game = this.gamesManager.startGame(name, life);

        callback(null);
    });

    Then('game {name} has a starting life total of {life}', function (name, life, callback) {
        var game = this.gamesManager.findGameByName(name);
        assert.notEqual(game, null);
        assert.equal(game.startingLifeTotal(), life);
        this.cache.game = game;
        callback(null);
    });

    When('a player {playerName} joins the game {gameName}', function (playerName, gameName, callback) {
        var game = this.gamesManager.findGameByName(gameName);
        assert.notEqual(game, null);

        this.cache.player = game.joinPlayer(playerName);
        this.cache.game = game;
        
        callback(null);
    });

    Then('game {gameName} has {count} player(s)', function (gameName, count, callback) {
        var game = this.gamesManager.findGameByName(gameName);
        assert.notEqual(game, null);
        assert.equal(game.players().length, count);

        this.cache.game = game;
        callback(null);
    });


    Then('game {gameName} has a player {playerName}', function (gameName, playerName, callback) {
        var game = this.gamesManager.findGameByName(gameName);
        assert.notEqual(game, null);
        var player = game.findPlayerByName(playerName);
        assert.notEqual(player, null);
        this.cache.game = game;
        this.cache.player = player;
        callback(null);
    });

    Then('player {playerName} has a life total of {life}', function (playerName, life, callback) {
        var game = this.gamesManager.getPrimaryGame();
        assert.notEqual(game, null);
        var player = game.findPlayerByName(playerName);
        assert.notEqual(player, null);
        assert.equal(player.lifeTotal(), life);
        this.cache.player = player;
        callback(null);
    });
});