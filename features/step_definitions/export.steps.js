'use strict';

var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
    requirejs([], function () {
        //var Given = context.Given;
        var When = context.When;
        var Then = context.Then;

        When('that {object} is exported', function (object, callback) {
            this.cache.export = JSON.stringify(this.cache[object].toJsonObject());
            callback(null);
        });

        Then('the exported object has a property "{propertyName}" with any value', function (propertyName, callback) {
            var jsonObject = JSON.parse(this.cache.export);
            assert.ok(jsonObject[propertyName]);
            callback(null);
        });

        Then('the exported object has a property "{propertyName}" with value {value}', function (propertyName, value, callback) {
            var jsonObject = JSON.parse(this.cache.export);
            assert.equal(jsonObject[propertyName], value);

            callback(null);
        });

        Then('the exported object has a property "{propertyName}" containing {count} items', function (propertyName, count, callback) {
            var jsonObject = JSON.parse(this.cache.export);
            assert.ok(jsonObject[propertyName]);
            assert.equal(jsonObject[propertyName].length, parseInt(count));

            callback(null);
        });

        Then('the "{collectionPropertyName}" property of the exported object contains'
            + ' an object with a property "{propertyName}" and a value ("){value}(")', function (collectionPropertyName, propertyName, value, callback) {
                var fixQuotes = value.replace(/^"?(.+(?="$))"$/, '$1'); //somehow the '... and a value "abc"' results in a value = 'abc"', this regex will fix the ending " when needed...
                var jsonObject = JSON.parse(this.cache.export);
                var collection = jsonObject[collectionPropertyName];
                assert.ok(collection);
                var found = collection.some(function (item) {
                    return item[propertyName] == fixQuotes;
                });
                assert.ok(found);

                callback(null);
            });

    });
});
