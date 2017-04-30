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

    this.findPlayerByName = function (name) {
        return this.players()
            .find(function (player) { return player.name() === name; });
    }

    this.exchangeLifeTotalsBetween = function (playerA, playerB) {
        var lifeTotalCache = playerA.lifeTotal();
        playerA.setLifeTotal(playerB.lifeTotal());
        playerB.setLifeTotal(lifeTotalCache);
    }

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

    this.setLifeTotal = function (value) {
        this.lifeTotal(value);   
    }

    this.adjustLifeTotal = function (value) {
        this.lifeTotal(this.lifeTotal() + value);
        return this.lifeTotal();
    }

    this.isDealtCombatDamage = function (combatDamage) {
        return this.adjustLifeTotal(-1 * combatDamage);
    }

    this.loseLife = function (points) {
        return this.adjustLifeTotal(-1 * points);
    }

    this.gainsLife = function (points) {
        return this.adjustLifeTotal(+1 * points);
    }

    this.dealsLifelinkDamageTo = function (player, damage) {
        player.isDealtCombatDamage(damage);
        this.adjustLifeTotal(+1 * damage);
    }

    this.drainsLife = function (points, players) {
        var totalDrain = 0;
        players.forEach(
            function (player) {
                player.loseLife(points);
                totalDrain += points;
            }
        );
        
        this.adjustLifeTotal(+1 * totalDrain);
    }
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

    this.setLifeTotal = function (value) {
        this.team().setLifeTotal(value);
    }

    this.isDealtCombatDamage = function (combatDamage) {
        return this.team().isDealtCombatDamage(combatDamage);
    }

    this.loseLife = function (points) {
        return this.team().loseLife(points);
    }

    this.gainsLife = function (points) {
        return this.team().gainsLife(points);
    }

    this.dealsLifelinkDamageTo = function (player, damage) {
        this.team().dealsLifelinkDamageTo(player, damage);
    }

    this.drainsLife = function (points, players) {
        this.team().drainsLife(points, players);
    }

    //default is rounded down.
    this.loseHalfLifeTotal = function (roundedUp) {
        //TODO: 2HG regels na zoeken???
        var half = this.lifeTotal() / 2.0;
        if (roundedUp) {
            return this.loseLife(Math.ceil(half));
        } else {
            return this.loseLife(Math.floor(half));
        }
    }
    
}
