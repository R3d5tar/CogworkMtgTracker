define(['ko', './game'], function (ko, Game) {

    return function GamesManager() {
        var _games = ko.observableArray([]);

        this.defaultStartingLifeTotal = ko.observable(20);

        this.games = _games;

        this.startGame = function (name, lifeTotal) {
            var newGame = new Game(this);
            if (lifeTotal) {
                newGame.startingLifeTotal(lifeTotal);
            }
            else {
                newGame.startingLifeTotal(this.defaultStartingLifeTotal);
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
    }

});