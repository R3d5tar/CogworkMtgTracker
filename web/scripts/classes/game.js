define(['ko', 'sprintf', 'moment', './team', './player'], function (ko, sprintf, moment, Team, Player) {

    return function Game(parent) {
        var _id = sprintf.sprintf("game-%s", moment().format("YYYY/MM/DD-HH:mm:ss.SSS"));
        this.parent = parent; //gameManager
        var _childern = ko.observableArray([]);
        this.name = ko.observable(_id.toString());
        this.startingLifeTotal = ko.observable(null);

        this.id = ko.computed(function () {
            return _id.toString();
        });

        this.childeren = function () {
            return _childern().filter(function () { return true; });
        }

        this.teams = ko.computed(function () {
            return getChildernOfType("team");
        }, this);

        this.players = ko.computed(function () {
            return getChildernOfType("player");
        }, this);

        this.commanders = function () {
            return getChildernOfType("commander");
        }

        this.counters = function () {
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
                    return child.types && child.types.some(function (item) { return item === type; });
                }
            );
        };
    }

});