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

  });
});
