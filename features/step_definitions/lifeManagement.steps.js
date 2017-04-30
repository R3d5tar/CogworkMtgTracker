'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');

defineSupportCode(function (context) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;

    Given('{playerNameA} and {playerNameB} play a game', function (playerNameA, playerNameB, callback) {
        this.cache.game = this.gamesManager.startGame();

        this.cache.game.joinPlayer(playerNameA);
        this.cache.game.joinPlayer(playerNameB);

        callback(null);
    });

    Given('{playerName} is at {life} life', function (playerName, life, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        player.setLifeTotal(parseInt(life));

        callback(null);
    });

    When('{playerName} is dealt {combatDamage} combat damage', function (playerName, combatDamage, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        player.isDealtCombatDamage(parseInt(combatDamage));

        callback(null);
    });

    Then('{playerName} has {life} life', function (playerName, life, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        assert.equal(player.lifeTotal(), parseInt(life));

        callback(null);
    });

    When('{playerName} loses {life} life', function (playerName, life, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        player.loseLife(parseInt(life));

        callback(null);
    });

    When('{playerName} gains {life} life', function (playerName, life, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        player.gainsLife(parseInt(life));

        callback(null);
    });

    When('{playerName} his/her life is set to {life}', function (playerName, life, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        player.setLifeTotal(parseInt(life));

        callback(null);
    });

    When('{playerNameA} and {playerNameA} exchange life totals', function (playerNameA, playerNameB, callback) {
        var playerA = this.cache.game.findPlayerByName(playerNameA);
        var playerB = this.cache.game.findPlayerByName(playerNameB);
        this.cache.game.exchangeLifeTotalsBetween(playerA, playerB);

        callback(null);
    });

    When('{playerNameA} is dealt {damage} damage with lifelink by {playerNameB}', function (playerNameA, damage, playerNameB, callback) {
        var playerA = this.cache.game.findPlayerByName(playerNameA);
        var playerB = this.cache.game.findPlayerByName(playerNameB);
        playerB.dealsLifelinkDamageTo(playerA, parseInt(damage));

        callback(null);
    });

    When('{playerName} loses half his/her life rounded up', function (playerName, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        var roundedUp = true;
        player.loseHalfLifeTotal(roundedUp);

        callback(null);
    });

    When('{playerName} loses half his/her life rounded down', function (playerName, callback) {
        var player = this.cache.game.findPlayerByName(playerName);
        var roundedDown = false; //false means that is should be rounded down.
        player.loseHalfLifeTotal(roundedDown);

        callback(null);
    });

    When('{playerNameA} drains {x} life from {playerNameB}', function (playerNameA, x, playerNameB, callback) {
        var playerA = this.cache.game.findPlayerByName(playerNameA);
        var playerB = this.cache.game.findPlayerByName(playerNameB);
        playerA.drainsLife(parseInt(x), [playerB]);

        callback(null);
    });

});