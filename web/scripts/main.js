if (!requirejs) {
    requirejs = require;
}

requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        'jquery.validate': 'bower_components/jquery-validation/dist/jquery.validate.min',
        ko: 'bower_components/knockout/dist/knockout',
        moment: 'bower_components/moment/min/moment.min',
        sprintf: 'bower_components/sprintf/src/sprintf',
        text: 'bower_components/text/text',
        msgpack: 'bower_components/msgpack-lite/dist/msgpack.min'
    }
});


requirejs(
    ["scripts/classes/gamesmanager", "ko", 'jquery', "scripts/log", "scripts/ui", "scripts/api", "scripts/storage", "scripts/tools/utils"],
    function (GamesManager, ko, $, log, ui, api, storage, utils) {
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

        //var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

        log.init(document.getElementById("log"));

        ko.components.register('basic-modal', {
            viewModel: { require: 'components/basic-modal' },
            template: { require: 'text!components/basic-modal.html' }
        });
        ko.components.register('share-buttons', {
            viewModel: { require: 'components/share-buttons' },
            template: { require: 'text!components/share-buttons.html' }
        });

        ko.bindingHandlers.fileUpload = {
            init: function (element, valueAccessor) {
                $(element).change(function () {
                    valueAccessor()(element.files[0]);
                });
            },
            update: function (element, valueAccessor) {
                if (ko.unwrap(valueAccessor()) === null) {
                    $(element).wrap('<form>').closest('form').get(0).reset();
                    $(element).unwrap();
                }
            }
        };

        var viewModel = {
            manager: new GamesManager(),
            ui: ui,
            api: api,
            log: log
        }

        //TODO: feature-support for merging these two...
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
