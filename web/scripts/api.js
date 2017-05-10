define([], function () {
    var api = new function () {
        var _gamesManager = null;

        this.init = function (gamesManager) {
            _gamesManager = gamesManager;
        }

        this.startGame = function (lifeTotal) {
            return _gamesManager.startGame(lifeTotal);
        };

        this.getGameById = function (gameId) {
            return _gamesManager.getGameById(gameId);
        }

        this.joinPlayer = function (name, gameId) {
            var game = null;
            if (gameId) {
                game = this.getGameById(gameId);
            }
            if (!game) {
                game = _gamesManager.getPrimaryGame();
            }
            return game.joinPlayer(name);
        }

        this.getDefaultStartingLifeTotal = function () {
            return _gamesManager.defaultStartingLifeTotal();
        };

    }();
    return api;
});