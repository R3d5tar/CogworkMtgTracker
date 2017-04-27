var api = new function () { //eslint-disable-line no-unused-vars

    this.startGame = function (lifeTotal) {
        return gamesManager.startGame(lifeTotal);
    };

    this.getGameById = function (gameId) {
        return gamesManager.getGameById(gameId);
    }

    this.joinPlayer = function (name, gameId) {
        var game = null;
        if (gameId) {
           game = this.getGameById(gameId);
        }
        if (!game)
        { 
            game = gamesManager.getPrimaryGame();
        }
        return game.joinPlayer(name);
    }
}();