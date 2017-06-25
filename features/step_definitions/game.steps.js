'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
    requirejs(['scripts/classes/game'], function (Game) {
        var Given = context.Given;
        var When = context.When;
        var Then = context.Then;

        Given('there is a game with a starting life total of {startingLifeTotal}', function (startingLifeTotal, callback) {
            this.cache.game = new Game(null);
            this.cache.game.startingLifeTotal(parseInt(startingLifeTotal));
            callback(null);
        });

        Given('player ("){playerName}(") joins that game', function (playerName, callback) {
            this.cache.player = this.cache.game.joinPlayer(playerName);
            callback(null);
        });

        When('that import object is imported as a game', function (callback) {
            this.cache.game = Game.fromJsonObject(this.cache.import);
            callback(null);
        });

        Then('there is a game object', function (callback) {
            assert.ok(this.cache.game);
            callback(null);
        });

        Then('that game has a starting life total of {startingLifeTotal}', function (startingLifeTotal, callback) {
            assert.equal(this.cache.game.startingLifeTotal(), parseInt(startingLifeTotal));
            callback(null);

        });

        Then('that game has {count} teams', function (count, callback) {
            assert.equal(this.cache.game.teams().length, parseInt(count));
            callback(null);
        });

        Then('that game contains a team with id "{teamId}"', function (teamId, callback) {
            var found = this.cache.game.teams().some(function (team) {
                return team.id() == teamId
            });
            assert.ok(found);
            callback(null);
        });



    })
});