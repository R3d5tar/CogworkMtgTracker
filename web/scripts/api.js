define(['./tools/utils', './classes/gamesmanager'], function (utils, GamesManager) {
    var api = new function () {
        var _gamesManager = null;

        this.init = function (gamesManager) {
            _gamesManager = gamesManager;
        };

        this.startGame = function (name, lifeTotal) {
            return _gamesManager.startGame(name, lifeTotal);
        };

        this.getGameById = function (gameId) {
            return _gamesManager.findGameById(gameId);
        };

        this.joinPlayer = function (name, gameId, teamId) {
            var game = null;
            if (gameId) {
                game = this.getGameById(gameId);
            }
            if (!game) {
                game = _gamesManager.getPrimaryGame();
            }

            var team = null;
            if (teamId) {
                team = game.findTeamById(teamId);
            }

            return game.joinPlayer(name, team);
        };

        this.removeTeam = function (gameId, teamId) {
            var game = _gamesManager.findGameById(gameId);
            var team = game.findTeamById(teamId);
            game.removeTeam(team);
        };

        this.getDefaultStartingLifeTotal = function () {
            return _gamesManager.defaultStartingLifeTotal();
        };

        this.getGameNameSuggestion = function () {
            return _gamesManager.getGameNameSuggestion();
        };

        this.getGames = function () {
            return _gamesManager.getGames();
        };

        this.findGameById = function (id) {
            return _gamesManager.findGameById(id);
        };

        this.dealCombatDamage = function (gameId, playerId, damage) {
            var game = _gamesManager.findGameById(gameId);
            var player = game.findPlayerById(playerId);
            player.isDealtCombatDamage(damage);
        };

        this.gainLife = function (gameId, playerId, lifePoints) {
            var game = _gamesManager.findGameById(gameId);
            var player = game.findPlayerById(playerId);
            player.gainsLife(lifePoints);
        }

        this.resetAll = function () {
            _gamesManager.resetAll();
        }

        this.exportStateDownloadLink = function () {
            return "data:application/json;base64,"
                + btoa(JSON.stringify(_gamesManager.toJsonObject(), null, '\t'));
        }

        this.exportShareUrl = function () {
            return window.location.origin + window.location.pathname + "#load=" //TODO: query string or hash?
                + utils.encodeToUrlParam(_gamesManager.toJsonObject());
        }

        this.importFromFile = function (data) {
            var newGamesManager = GamesManager.fromJsonObject(JSON.parse(data));
            _gamesManager.merge(newGamesManager); //TOOD....
        }

    }();
    return api;
});