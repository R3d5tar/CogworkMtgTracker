define(['ko', './Game', 'sprintf', 'moment', './../tools/utils'], function (ko, Game, sprintf, moment, utils) {

    var GamesManager = function GamesManager() {
        var self = this;
        var _games = ko.observableArray([]);
        this.games = _games; //only for usage in display 

        this.defaultStartingLifeTotal = ko.observable(20);

        this.getGameNameSuggestion = function () {
            return sprintf.sprintf("%s %s Magic", moment().format("dddd"), utils.timeOfDayName());
        }

        this.addGame = function (game) {
            _games.push(game);
        };

        this.startGame = function (name, lifeTotal) {
            var newGame = new Game(this);
            if (lifeTotal) {
                newGame.startingLifeTotal(lifeTotal);
            }
            else {
                newGame.startingLifeTotal(this.defaultStartingLifeTotal());
            }
            if (name) {
                newGame.name(name);
            }

            _games.push(newGame);
            return newGame;
        }.bind(this);

        this.findGameById = function (gameId) {
            return _games().find(function (game) { return game.id() === gameId; });
        }

        this.findGameByName = function (gameName) {
            return _games().find(function (game) { return game.name() === gameName; });
        }

        this.getPrimaryGame = function () {
            var numberOfGames = _games().length;
            if (numberOfGames === 0) {
                return this.startGame();
            } else {
                return _games()[numberOfGames - 1]
            }
        }

        this.removeGameByName = function (gameName) {
            var foundGame = this.findGameByName(gameName);
            if (foundGame !== null) {
                this.removeGame(foundGame);
            }
        }

        this.removeGameById = function (gameId) {
            var foundGame = this.findGameById(gameId);
            if (foundGame !== null) {
                this.removeGame(foundGame);
            }
        }

        this.removeGame = function (game) {
            var index = _games().indexOf(game);
            if (index > -1) {
                _games().splice(index, 1);
            }
        }.bind(this);

        this.getGames = function () {
            return _games();
        };

        this.hasGame = ko.computed(function () {
            return _games().length > 0;
        }).bind(this);

        this.hasTeam = ko.computed(function () {
            return _games().some(
                function (game) { return game.hasTeam(); 
            });
        }).bind(this);

        this.hasPlayer = ko.computed(function () {
            return _games().some(
                function (game) { return game.hasPlayer(); 
            });
        }).bind(this);

        this.resetAll = function () {
            while (_games().length > 0) {
                _games.pop();
            }
        };

        this.toJsonObject = function () {
            var result = {
                defaultStartingLifeTotal: self.defaultStartingLifeTotal(),
                games: []
            };
            _games().forEach(function (game) {
                result.games.push(game.toJsonObject());
            });
            return result;
        }

        this.merge = function (otherManager) {
            this.defaultStartingLifeTotal(otherManager.defaultStartingLifeTotal());

            otherManager.games().forEach(function (game) {
                var found = self.findGameById(game.id());
                if (found) {
                    //remove old one...
                    self.removeGame(found);
                }
                //add the new one
                self.addGame(game);
                game.parent = self;
            });
        }
    }

    GamesManager.fromJsonObject = function (object) {
        var result = new GamesManager();
        result.defaultStartingLifeTotal(object.defaultStartingLifeTotal);
        object.games.forEach(function (gameObject) {
            result.addGame(Game.fromJsonObject(gameObject, this));
        });
        return result;
    };

    return GamesManager;

});