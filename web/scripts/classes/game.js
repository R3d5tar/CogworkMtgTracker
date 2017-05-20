define(['ko', 'sprintf', 'moment', './team', './player'], function (ko, sprintf, moment, Team, Player) {

    var Game = function (parent, id) {
        var _id = sprintf.sprintf("game-%s", moment().format("YYYY/MM/DD-HH:mm:ss.SSS"));
        if (id) {
            _id = id;
        }
        this.parent = parent; //gameManager
        var _teams = ko.observableArray([]);
        this.name = ko.observable(_id.toString());
        this.startingLifeTotal = ko.observable(null);

        this.id = ko.computed(function () {
            return _id.toString();
        });

        this.teams = ko.computed(function () {
            return _teams();
        }, this);

        this.players = ko.computed(function () {
            var result = [];
            this.teams().forEach(function (team) {
                team.players().forEach(function (player) {
                    result.push(player);
                });
            });
            return result;
        }, this);

        this.addTeam = function (team) {
            _teams.push(team);
            return team;
        }.bind(this);

        this.removeTeam = function (team) {
            var index = _teams.indexOf(team);
            _teams.splice(index, 1);
        }.bind(this);

        this.joinNewTeam = function () {
            var team = new Team(this, this.startingLifeTotal());
            return this.addTeam(team);
        }.bind(this);

        this.joinPlayer = function (name, team) {
            if (!team) {
                team = this.joinNewTeam();
            }
            var player = new Player(this, team, name);
            return player;
        }.bind(this);

        this.findPlayerById = function (id) {
            return this.players()
                .find(function (player) { return player.id() === id; });
        }

        this.hasTeam = ko.observable(function () {
            return this.teams().length > 0;
        }).bind(this);

        this.hasPlayer = ko.observable(function () {
            return this.players().length > 0;
        }).bind(this);

        this.findPlayerByName = function (name) {
            return this.players()
                .find(function (player) { return player.name() === name; });
        }

        this.findTeamById = function (id) {
            return this.teams()
                .find(function (team) { return team.id() === id; });
        }

        this.findTeamByName = function (name) {
            return this.teams()
                .find(function (team) { return team.name() === name; });
        }

        this.exchangeLifeTotalsBetween = function (playerA, playerB) {
            var lifeTotalCache = playerA.lifeTotal();
            playerA.setLifeTotal(playerB.lifeTotal());
            playerB.setLifeTotal(lifeTotalCache);
        }

        this.toJsonObject = function () {
            var result = {
                "id": _id,
                "name": this.name(),
                "startingLifeTotal": this.startingLifeTotal(),
                "teams": []
            };
            this.teams().forEach(function (team) {
                result.teams.push(team.toJsonObject());
            });
            return result;
        }
    }

    Game.fromJsonObject = function (object, parent) {
        var result = new Game(parent || null, object.id);
        result.name(object.name);
        result.startingLifeTotal(object.startingLifeTotal);
        object.teams.forEach(function (teamObject) {
            result.addTeam(Team.fromJsonObject(teamObject, result));
        });

        return result;
    }

    return Game;

});