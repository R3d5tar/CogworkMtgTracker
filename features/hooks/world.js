var { defineSupportCode } = require('cucumber');
var assert = require('assert');
var execfile = require(process.cwd() + '/features/tools/execfile.js')

var sut = {};

execfile(process.cwd() + '/web/bower_components/moment/min/moment.min.js', sut);
execfile(process.cwd() + '/web/bower_components/sprintf/dist/sprintf.min.js', sut);
execfile(process.cwd() + '/web/scripts/util.js', sut);
sut.ko = require(process.cwd() + '/web/bower_components/knockout/dist/knockout.js');

execfile(process.cwd() + '/web/scripts/classes.js', sut);

defineSupportCode(function (context) {
    var setWorldConstructor = context.setWorldConstructor;

    //setup World    
    var theWorld = function () {
        /*
        // used by template
        this.calculator = {
             variableX: null,
             variableY: null
         };
         */

        this.gamesManager = new sut.GamesManager();
        this.cache = {};
    };

    setWorldConstructor(theWorld);
});