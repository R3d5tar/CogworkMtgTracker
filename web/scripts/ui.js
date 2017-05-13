define(['ko', 'sprintf', './api', './log', './models/Modal'], function (ko, sprintf, api, log, Modal) {

    var ui = new function () {
        var self = this;

        /* context */
        this.activeGame = null;
        //this.activeTeamId = ko.observable(null);
        //this.activePlayerId = ko.observable(null);

        /* modals */
        // // use for trouble shooting, when necesary
        // this.firstModal = new Modal(function () {
        //     alert('OK');
        //     this.active(false);
        // });

        this.startGameModal = new Modal(
            function ok() {
                this.active(false);
                var game = api.startGame(
                        self.startGameModal.gameName(),
                        self.startGameModal.startingLifeTotal()
                );
                log.writeAction(
                    sprintf.sprintf("start game %s", game.startingLifeTotal()),
                    sprintf.sprintf("Game '%s' started with starting life totals of %s [gid=%s]", game.name(), game.startingLifeTotal(), game.id())
                );
                self.activeGame = game;
            });
        this.startGameModal.startingLifeTotal = ko.observable();
        this.startGameModal.gameName = ko.observable();
        this.startGameModal.show = function () {
            var _ = self.startGameModal
            _.startingLifeTotal(api.getDefaultStartingLifeTotal());
            _.gameName(api.getGameNameSuggestion());
            _.active(true);
        }

        this.joinPlayerModal = new Modal(
            function ok () {
                this.active(false);
                var _ = self.joinPlayerModal;
                var player = api.joinPlayer(_.playerName(), _.gameSelected().id());
                log.writeAction(
                    sprintf.sprintf("join %s to %s", player.name(), _.gameSelected().name()),
                    sprintf.sprintf("Player '%s' joined game '%s' at %s life [gid=%s, pid=%s]", 
                        player.name(), _.gameSelected().name(), player.lifeTotal(), _.gameSelected().id(), player.id())
                );
                self.activePlayer = player;
            });
        this.joinPlayerModal.playerName = ko.observable();
        this.joinPlayerModal.games = ko.observableArray();
        this.joinPlayerModal.gameSelected = ko.observable();
        this.joinPlayerModal.show = function () {
            var _ = self.joinPlayerModal;
            _.playerName("");
            _.games(api.getGames());
            _.gameSelected(self.activeGame);
            _.active(true);
        }

        /* generic logic */
        this.modals = ko.observableArray([
            //this.firstModal, 
            this.startGameModal,
            this.joinPlayerModal
        ]);

        this.modalActive = ko.computed(function () {
            return this.modals().some(function (_) { return _.active() })
        }, this);

        this.closeModal = function () {
            self.modals().forEach(function (_) { _.active(false); });
            return true; //ensure other actions.
        }.bind(this);

    }();
    return ui;

});