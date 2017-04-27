var ui = new function () { //eslint-disable-line no-unused-vars

    this.showStartGame = function () {
        $("#startgame input[name='lifetotal']").first().val(gamesManager.defaultStartingLifeTotal());
        modals.showModal("startgame");
    }

    this.handleStartGamePrompt = function () {
        var lifeTotal = $("#startgame input[name='lifetotal']").first().val();
        var game = api.startGame(lifeTotal);
        log.clear();
        log.writeAction(
            "start game " + lifeTotal, 
            sprintf("Game '%s' started with starting life totals of %s", game.id(), game.startingLifeTotal())
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
            sprintf("Player '%s' joined game '%s' with %s life", player.name(), player.parent.id(), player.lifeTotal())
        );
    }

}();


var log = new function ()
{
    var _out = null;

    this.init = function (element) {
        _out = element;
    }

    this.writeAction = function (action, result) {
        this.writeLine(
            sprintf("%s | %s", action, result));
    }

    this.writeLine = function (line) {
        _out.innerText += sprintf("\n\r [%s] %s", timestamp(), line);
        _out.innerText = _out.innerText.trim();
    }

    this.clear = function () {
        _out.innerText = "";
    }

    function timestamp() {
        return moment().format("HH:mm:ss");
    }
}();
