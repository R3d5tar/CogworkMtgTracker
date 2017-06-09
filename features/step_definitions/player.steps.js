'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
  requirejs(['scripts/classes/Player', 'scripts/classes/Team'], function (Player, Team) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;

    Given('there is a player {playerName}', function (playerName, callback) {
      this.cache["player"] = new Player(null, new Team(null), playerName);
      callback(null);
    });

    Given('(player) "{playerName}" joins that team', function (playerName, callback) {
      this.cache.player = new Player(null, this.cache.team, playerName);
      callback(null);
    });

    When('that import object is imported as a player', function (callback) {
      this.cache.player =
        Player.fromJsonObject(this.cache.import);
      callback(null);
    });

    Then('that player is named "{playerName}', function (playerName, callback) {
      assert(this.cache.player.name(), playerName);
      callback(null);
    });

    Then('that player has id {playerId}', function (playerId, callback) {
      assert(this.cache.player.id(), playerId);
      callback(null);
    });

  });
});
