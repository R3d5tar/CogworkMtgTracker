define(['./modals', 'sprintf', './api', 'jquery', './log'], function (modals, sprintf, api, $, log) {

    var ui = new function () {

        this.showStartGame = function () {
            $("#startgame input[name='lifetotal']").first().val(api.getDefaultStartingLifeTotal());
            modals.showModal("startgame");
        }

        this.handleStartGamePrompt = function () {
            var lifeTotal = $("#startgame input[name='lifetotal']").first().val();
            var game = api.startGame(lifeTotal);
            log.clear();
            log.writeAction(
                "start game " + lifeTotal,
                sprintf.sprintf("Game '%s' started with starting life totals of %s", game.id(), game.startingLifeTotal())
            );
        }

        this.showJoinPlayer = function () {
            $("#joinplayer input[name='name']").first().val("");
            modals.showModal("joinplayer");
        }

        this.handleJoinPlayerPrompt = function () {
            var name = $("#joinplayer input[name='name']").first().val();
            var player = api.joinPlayer(name);
            log.writeAction(
                "join player " + name,
                sprintf.sprintf("Player '%s' joined game '%s' with %s life", player.name(), player.parent.id(), player.lifeTotal())
            );
        }

        // this.showGeneralNumberAndDropdown = function (title, label, value, confirmLabel, confirmCallback) {
        //     var id = "generalNumberAndDropdown";
        // };

        // this.showDealDamage = function () {
        //     this.showGeneralNumber()
        // }

        // this.showGainLife;
        // this.adjustLifeTotal;
        // this.setLifeTotal;

    }();
    return ui;

});