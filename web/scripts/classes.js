function GamesManager() { //eslint-disable-line no-unused-vars
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
        if (foundGame !== null)
        {
            this.removeGame(foundGame);
        }   
    } 

    this.removeGameById = function (gameId) {
        var foundGame = this.findGameById(gameId);
        if (foundGame !== null)
        {
            this.removeGame(foundGame);
        }   
    }  

    this.removeGame = function (game) {
        var index = _games().indexOf(game);
        if (index > -1)
        {
            _games().splice(index,1);
        }
    }.bind(this);
}

function Game(parent)
{
    this.parent = parent; //gameManager
    var _childern = ko.observableArray([]);
    var _id = sprintf("game-%s", moment().format("YYYY/MM/DD-HH:mm:ss.SSS"));
    this.name = ko.observable(_id.toString());
    this.startingLifeTotal = ko.observable(null);

    this.id = function () {
        return _id.toString();
     }

    this.childeren = function () {
        return _childern().filter(function () { return true; });
    }

    this.teams = ko.computed(function ()  { 
        return getChildernOfType("team");
    }, this);

    this.players = ko.computed(function ()  { 
        return getChildernOfType("player");
    }, this);

    this.commanders = function ()  { 
        return getChildernOfType("commander");
    }

    this.counters = function ()  { 
        return getChildernOfType("counters");
    }
    
    this.joinTeam = function () {
        var team = new Team(this, this.startingLifeTotal());
        _childern.push(team);
        return team;
    }.bind(this);

    this.joinPlayer = function (name, team) {
        if (!team) {
            team = this.joinTeam();
        }
        var player = new Player(this, team, name);
        _childern.push(player);
        return player;
    }.bind(this);

    function getChildernOfType(type) {
        return _childern().filter(
            function (child) { 
                return child.types && child.types.some(function (item) { return item === type; } );
            } 
        );
    };
}

function Team(parent, lifeTotal) {
    this.types = ["team"];
    this.parent = parent; //game
    var _players = ko.observableArray([]);
    var _internalName = "team-" + guid(); //eslint-disable-line no-undef
    this.lifeTotal = ko.observable(lifeTotal);
    this.players = _players;

    this.name = ko.computed(function () {
        if (_players().length === 0) {
            return _internalName;
        }
        else {
            var name = "";
            this.players().forEach(function (player) {
                name += player.name() + " ";
            });
            return name.trim();
        }
    }, this);

    this.addPlayer = function (player) {
        _players.push(player);
        return player;
    }.bind(this);
}

function Player(parent, team, name) {
    this.types = ["player"];
    this.parent = parent; //game
    this.team = ko.observable(team);
    this.name = ko.observable(name);

    this.team().addPlayer(this);

    this.lifeTotal = function () {
        return this.team().lifeTotal();
    }
}
