define(['ko', 'scripts/tools/utils'], function (ko, utils) {

    var Player = function Player(parent, team, name, id) {
        var _id = "player-" + utils.guid();
        if (id) {
            _id = id;
        }
        this.types = ["player"];
        this.parent = parent; //game
        this.team = ko.observable(team);
        this.name = ko.observable(name);

        this.updateTeam = function (team) {
            if (this.team() != team) {
                if (this.team())
                    this.team().tryRemovePlayer(this);
                this.team(team);
            }
        }.bind(this);

        this.id = ko.computed(function () {
            return _id;
        });

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

        this.toJsonObject = function () {
            return {
                "id": _id,
                "name": this.name()
            };
        }
        
        //some final logic...
        if (this.team()) {
            this.team().addPlayer(this);
        }
    }

    Player.fromJsonObject = function (object, parent, team) {
        return new Player(parent || null, team || null, object.name, object.id);
    }

    return Player;
});