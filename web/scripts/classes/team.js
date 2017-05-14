define(['ko', './player', 'scripts/tools/utils'], function (ko, Player, utils) {

    var Team = function (parent, lifeTotal, id) {
        var _id = "team-" + utils.guid();
        if (id) {
            _id = id;
        }
        this.types = ["team"];
        this.parent = parent; //game
        var _players = ko.observableArray([]);

        this.lifeTotal = ko.observable(lifeTotal);
        this.players = _players;

        this.id = ko.computed(function () {
            return _id;
        });

        this.name = ko.computed(function () {
            if (_players().length === 0) {
                return _id;
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
            player.updateTeam(this);
            return player;
        }.bind(this);

        this.tryRemovePlayer = function (player) {
            var index = _players.indexOf(player);
            if (index >= 0) {
                _players.splice(index, 1);
            }
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

        this.drainsLife = function (points, otherPlayers) {
            var totalDrain = 0;
            otherPlayers.forEach(
                function (player) {
                    player.loseLife(points);
                    totalDrain += points;
                }
            );

            this.adjustLifeTotal(+1 * totalDrain);
        }

        this.toJsonObject = function () {
            var result = {
                "id": _id,
                "lifeTotal": this.lifeTotal(),
                "players": []
            };
            this.players().forEach(
                function (player) {
                    result.players.push(player.toJsonObject());
                });
            return result;
        }
    }

    Team.fromJsonObject = function (object) {
        var result = new Team(null, parseInt(object.lifeTotal), object.id);

        object.players.forEach(function (playerObject) {
            result.addPlayer(Player.fromJsonObject(playerObject));
        });

        return result;
    }

    return Team;

});