'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
  requirejs(['scripts/classes/player', 'scripts/classes/team'], function (Player, Team) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;

    Given('there is a player {playerName}', function (playerName, callback) {
      this.cache["player"] = new Player(null, new Team(null), playerName);
      callback(null);
    });

    When('that {object} is exported', function (object, callback) {
      this.cache.export = JSON.stringify(this.cache[object].toJsonObject());
      callback(null);
    });

    Then('the exported object has a property "{propertyName}" with value {value}', function (propertyName, value, callback) {
      var jsonObject = JSON.parse(this.cache.export);
      assert.equal(jsonObject[propertyName], value);

      callback(null);
    });

    Then('the exported object has a property "{propertyName}" with any value', function (propertyName, callback) {
      var jsonObject = JSON.parse(this.cache.export);
      assert.ok(jsonObject[propertyName]);

      callback(null);
    });

    Given('there is a team starting with {startingLifeTotal} life', function (startingLifeTotal, callback) {
      this.cache["team"] = new Team(null, parseInt(startingLifeTotal));

      callback(null);
    });

    Then('the exported object has a property "{propertyName}" containing {count} items', function (propertyName, count, callback) {
      var jsonObject = JSON.parse(this.cache.export);
      assert.ok(jsonObject[propertyName]);
      assert.equal(jsonObject[propertyName].length, parseInt(count));

      callback(null);
    });

    Given('there is an object to import', function (callback) {
      this.cache.import = {};
      callback(null);
    });

    Given('that import object has a property "{propertyName}" with value "{value}"', function (propertyName, value, callback) {
      this.cache.import[propertyName] = value;

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

    Given('that import object has a property "{propertyName}" containing an array', function (propertyName, callback) {
      this.cache.import[propertyName] = [];
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

    Then('that team has no players', function (callback) {
      assert.equal(this.cache.team.players().length, 0);
      callback(null);
    });

    Then('that team is at {lifeTotal} life', function (lifeTotal, callback) {
         assert(this.cache.team.lifeTotal, parseInt(lifeTotal));
         callback(null);
       });
  });
});
