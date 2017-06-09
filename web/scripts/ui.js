define(['ko', 'sprintf', './api', './log', './models/Modal', './tools/utils'], function (ko, sprintf, api, log, Modal, utils) {

    var ui = new function () {
        var self = this;

        /* context */
        this.activeGame = null;

        /* modals */

        this.startGameModal = new Modal("startGameModal",
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

        this.joinPlayerModal = new Modal("joinPlayerModal",
            function ok() {
                this.active(false);
                var _ = self.joinPlayerModal;
                var player = api.joinPlayer(_.playerName(), _.gameSelected().id(), _.teamSelected().id());
                if (_.teamSelected().id() != null) {
                    log.writeAction(
                        sprintf.sprintf("join %s to %s", player.name(), _.gameSelected().name()),
                        sprintf.sprintf("Player '%s' joined game '%s' at %s life [gid=%s, pid=%s]",
                            player.name(), _.gameSelected().name(), player.lifeTotal(), _.gameSelected().id(), player.id())
                    );
                } else {
                    log.writeAction(
                        sprintf.sprintf("join %s to %s of %s", player.name(), _.teamSelected().name(), _.gameSelected().name()),
                        sprintf.sprintf("Player '%s' joined team '%s' of game '%s' [gid=%s, tid=%s, pid=%s]",
                            player.name(), _.teamSelected().name(), _.gameSelected().name(), _.gameSelected().id(), _.teamSelected().id(), player.id())
                    );
                }
                self.activePlayer = player;
                self.activeGame = _.gameSelected();
            });
        this.joinPlayerModal.playerName = ko.observable();
        this.joinPlayerModal.games = ko.observableArray();
        this.joinPlayerModal.gameSelected = ko.observable();
        this.joinPlayerModal.teamSelected = ko.observable();
        this.joinPlayerModal.teams = ko.pureComputed(function () {
            var selection = self.joinPlayerModal.gameSelected()
            var result = [{ name: ko.observable('Single player or a new team'), id: function () { return null; } }];
            if (selection) {
                api.findGameById(selection.id()).teams().forEach(function (item) {
                    result.push(item);
                });
            }
            return result;
        });
        this.joinPlayerModal.show = function () {
            var _ = self.joinPlayerModal;
            _.playerName("");
            _.games(api.getGames());
            _.gameSelected(self.activeGame);
            _.teamSelected(_.teams()[0]);
            _.active(true);
        }

        this.resetAllModal = new Modal("resetAllModal",
            function ok() {
                this.active(false);
                api.resetAll();
                log.writeAction("reset all", "all games were reset and removed, bye!");
                self.activeGame = null;
            });
        this.resetAllModal.sure = ko.observable(false);
        this.resetAllModal.show = function () {
            var _ = self.resetAllModal;
            _.sure(false);
            _.active(true);
        };

        this.dealCombatDamageModal = new Modal("dealCombatDamageModal",
            function ok() {
                this.active(false);
                var _ = self.dealCombatDamageModal;
                api.dealCombatDamage(_.gameSelected().id(), _.playerSelected().id(), _.damage());
            }
        );
        this.dealCombatDamageModal.gameSelected = ko.observable();
        this.dealCombatDamageModal.games = ko.observableArray();
        this.dealCombatDamageModal.playerSelected = ko.observable();
        this.dealCombatDamageModal.players = ko.pureComputed(function () {
            var selection = self.dealCombatDamageModal.gameSelected()
            if (selection) {
                return api.findGameById(selection.id()).players();
            } else {
                return [];
            }
        });
        this.dealCombatDamageModal.damage = ko.observable(0);
        this.dealCombatDamageModal.lifeAfterDamage = ko.pureComputed(function () {
            if (self.dealCombatDamageModal.playerSelected()) {
                return self.dealCombatDamageModal.playerSelected().lifeTotal() - self.dealCombatDamageModal.damage();
            } else {
                return null;
            }
        });
        this.dealCombatDamageModal.show = function () {
            var _ = self.dealCombatDamageModal;
            _.games(api.getGames());
            _.gameSelected(self.activeGame);
            _.playerSelected(null);
            _.damage(0);
            _.active(true);
        }

        this.gainLifeModal = new Modal("gainLifeModal",
            function ok() {
                this.active(false);
                var _ = self.gainLifeModal;
                api.gainLife(_.gameSelected().id(), _.playerSelected().id(), _.lifeGain());
            }
        );
        this.gainLifeModal.gameSelected = ko.observable();
        this.gainLifeModal.games = ko.observableArray();
        this.gainLifeModal.playerSelected = ko.observable();
        this.gainLifeModal.players = ko.pureComputed(function () {
            var selection = self.gainLifeModal.gameSelected()
            if (selection) {
                return api.findGameById(selection.id()).players();
            } else {
                return [];
            }
        });
        this.gainLifeModal.lifeGain = ko.observable(0);
        this.gainLifeModal.lifeAfterDamage = ko.pureComputed(function () {
            if (self.gainLifeModal.playerSelected()) {
                return self.gainLifeModal.playerSelected().lifeTotal() + parseInt(self.gainLifeModal.lifeGain());
            } else {
                return null;
            }
        });
        this.gainLifeModal.show = function () {
            var _ = self.gainLifeModal;
            _.games(api.getGames());
            _.gameSelected(self.activeGame);
            _.playerSelected(null);
            _.lifeGain(0);
            _.active(true);
        }

        this.exportStateDialog = new Modal("exportStateDialog");
        this.exportStateDialog.download = ko.observable();
        this.exportStateDialog.filename = ko.computed(function () {
            return "CogworkMtgTracker-" + utils.filenameTimestamp() + ".json";
        }).bind(this);
        this.exportStateDialog.shareUrl = ko.observable();
        this.exportStateDialog.shareText = ko.computed(function () {
            return "Cogwork MTG Tracker - Shared state of " + utils.currentTimeString();
        }).bind(this);
        this.exportStateDialog.show = function () {
            var _ = self.exportStateDialog;
            _.download(api.exportStateDownloadLink());
            _.shareUrl(api.exportShareUrl());
            _.active(true);
        }

        this.importStateDialog = new Modal("importStateDialog",
            function ok() {
                var _ = self.importStateDialog;
                var file = _.fileObject()
                var reader = new FileReader();
                reader.onload = function (e) {
                    //TODO: options: merge? or replace??
                    api.importFromFile(e.target.result);
                    _.active(false);
                    _.fileObject(null);
                };
                reader.readAsText(file);
            });
        this.importStateDialog.fileObject = ko.observable();

        

        /* generic logic */
        this.modals = ko.observableArray([
            this.startGameModal,
            this.joinPlayerModal,
            this.resetAllModal,
            this.dealCombatDamageModal,
            this.gainLifeModal,
            this.exportStateDialog,
            this.importStateDialog
        ]);
        this.dynamicModals = ko.observableArray([]);

        this.showDialog = function (dialogName, ctx) {
            var dialog = self.modals().find(function (modal) { return modal.name() === dialogName; });
            if (dialog == null) {
                dialog = self.dynamicModals().find(function (modal) { return modal.name() === dialogName; });
            }
            dialog.show(ctx);
        }

        this.modalActive = ko.computed(function () {
            return this.modals().some(function (_) { return _.active() })
                || this.dynamicModals().some(function (_) { return _.active() });
        }, this);

        this.closeModal = function () {
            self.modals().forEach(function (_) { _.active(false); });
            self.dynamicModals().forEach(function (_) { _.active(false); });
            return true; //ensure other actions.
        }.bind(this);

    }();
    return ui;

});