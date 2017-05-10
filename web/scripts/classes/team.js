define(['ko', './player', 'scripts/tools/guid'], function (ko, Player, guid) {
    
    return function Team(parent, lifeTotal) {
        this.types = ["team"];
        this.parent = parent; //game
        var _players = ko.observableArray([]);
        var _internalName = "team-" + guid();
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

});