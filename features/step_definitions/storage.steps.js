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

    Then('that team has {count} players', function (count, callback) {
      assert.equal(this.cache.team.players().length, count);
      callback(null);
    });

    Then('that team is at {lifeTotal} life', function (lifeTotal, callback) {
      assert(this.cache.team.lifeTotal, parseInt(lifeTotal));
      callback(null);
    });

    Given('there is a team at {lifeTotal} life', function (lifeTotal, callback) {
      this.cache.team = new Team(parseInt(lifeTotal));
      callback(null);
    });

    Given('(player) "{playerName}" joins that team', function (playerName, callback) {
      this.cache.player = new Player(null, this.cache.team, playerName);
      callback(null);
    });

    Then('the "{collectionPropertyName}" property of the exported object contains'
      + ' an object with a property "{propertyName}" and a value "{value}"', function (collectionPropertyName, propertyName, value, callback) {
        var jsonObject = JSON.parse(this.cache.export);
        var collection = jsonObject[collectionPropertyName];
        assert.ok(collection);
        var found = collection.some(function (item) {
          return item[propertyName] == value;
        });
        assert.ok(found);

        callback(null);
      });

    Given('there is another object to import', function (callback) {
      this.stack.push(this.cache.import);
      this.cache.import = {};

      callback(null);
    });

    Given('that import object is added to the "{collectionPropertyName}" collection of the previous object', function (collectionPropertyName, callback) {
      var previous = this.stack.pop();
      previous[collectionPropertyName].push(this.cache.import);
      this.cache.import = previous;

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
