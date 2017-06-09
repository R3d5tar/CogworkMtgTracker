if (!requirejs) {
    requirejs = require;
}

requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min',
        'jquery.validate': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min',
        ko: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
        moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min',
        sprintf: 'https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.1.1/sprintf.min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        msgpack: 'https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min'
    }
});


requirejs(
    ["scripts/classes/GamesManager", "ko", 'jquery', "scripts/log", "scripts/ui", "scripts/api", "scripts/koConfig", "scripts/storage", "scripts/tools/utils"],
    function (GamesManager, ko, $, log, ui, api, _, storage, utils) {

        function tryLoadGamesManagerFromUrl() {
            if (window.location.hash.startsWith("#load=")) {
                var loadString = window.location.hash.substr(6);
                var endIndex = loadString.indexOf("?");
                if (endIndex == -1) {
                    endIndex = loadString.length;
                }
                loadString = loadString.substr(0, endIndex);
                window.location.hash = "";
                return GamesManager.fromJsonObject(
                    utils.decodeFromUrlParam(loadString)
                );
            }
        }

        log.init(document.getElementById("log"));

        var viewModel = {
            manager: new GamesManager(),
            ui: ui,
            api: api,
            log: log
        }
        
        var gamesManagerFromUrl = tryLoadGamesManagerFromUrl();
        if (gamesManagerFromUrl != null) {
            viewModel.manager = gamesManagerFromUrl;
        } else if (storage.foundCompatibleItem()) {
            viewModel.manager = storage.load();
        }

        storage.autoSave(viewModel.manager);
        window.onblur = function () {
            storage.saveNow();
        };

        api.init(viewModel.manager);

        ko.applyBindings(viewModel);
    }
);
