define(['ko', './game', 'sprintf', 'moment', './../tools/utils'], function (ko, Game, sprintf, moment, utils) {

    var GamesManager = function GamesManager() {
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

        this.resetAll = function () {
            while (_games().length > 0) {
                _games.pop();
            }
        };

        this.toJsonObject = function () {
            var result = {
                defaultStartingLifeTotal: this.defaultStartingLifeTotal(),
                games: []
            };
            _games().forEach(function (game) {
                result.games.push(game.toJsonObject());
            });
            return result;
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