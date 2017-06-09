'use strict';

var { defineSupportCode } = require('cucumber');
//var assert = require('assert');
var requirejs = require('requirejs');

defineSupportCode(function (context) {
    requirejs([], function () {
        var Given = context.Given;
        //var When = context.When;
        //var Then = context.Then;

        Given('there is an object to import', function (callback) {
            this.cache.import = {};
            callback(null);
        });

        Given('that (import )object has a property "{propertyName}" with value "{value}"', function (propertyName, value, callback) {
            this.cache.import[propertyName] = value;

            callback(null);
        });

        Given('that (import )object has a property "{propertyName}" containing an array', function (propertyName, callback) {
            this.cache.import[propertyName] = [];
            callback(null);
        });

        Given('there is another object to import', function (callback) {
            this.stack.push(this.cache.import);
            this.cache.import = {};
            callback(null);
        });

        Given('that (import )object is added to the "{collectionPropertyName}" collection of the previous object', function (collectionPropertyName, callback) {
            var previous = this.stack.pop();
            previous[collectionPropertyName].push(this.cache.import);
            this.cache.import = previous;
            callback(null);
        });

    });
});
