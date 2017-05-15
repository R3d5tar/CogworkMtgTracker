'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
    requirejs(['scripts/classes/team'], function (Team) {
        var Given = context.Given;
        var When = context.When;
        var Then = context.Then;

        Given('there is a team starting with {startingLifeTotal} life', function (startingLifeTotal, callback) {
            this.cache["team"] = new Team(null, parseInt(startingLifeTotal));
            callback(null);
        });

        Given('there is a team at {lifeTotal} life', function (lifeTotal, callback) {
            this.cache.team = new Team(parseInt(lifeTotal));
            callback(null);
        });

        When('that import object is imported as a team', function (callback) {
            this.cache.team =
                Team.fromJsonObject(this.cache.import);
            callback(null);
        });

        Then('there is a team object', function (callback) {
            assert.ok(this.cache.team);
            callback(null);
        });

        Then('that team has id "{teamId}"', function (teamId, callback) {
            assert(this.cache.team.id(), teamId);
            callback(null);
        });

        Then('that team has {count} players', function (count, callback) {
            assert.equal(this.cache.team.players().length, count);
            callback(null);
        });

        Then('that team is at {lifeTotal} life', function (lifeTotal, callback) {
            assert(this.cache.team.lifeTotal, parseInt(lifeTotal));
            callback(null);
        });

        Then('that team contains a player named "{playerName}"', function (playerName, callback) {
            var found =
                this.cache.team.players().some(
                    function (player) {
                        return player.name() == playerName;
                    }
                );
            assert.ok(found);

            callback(null);
        });

    });
});
