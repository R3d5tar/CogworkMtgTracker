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
        text: 'bower_components/text/text'
    }
});


requirejs(
    ["scripts/classes/gamesmanager", "ko", "scripts/log", "scripts/ui", "scripts/api", "scripts/storage"], 
    function(GamesManager, ko, log, ui, api, storage) {

        log.init(document.getElementById("log"));

        ko.components.register('basic-modal', {
            viewModel: { require: 'components/basic-modal' },
            template: { require: 'text!components/basic-modal.html' }
        });
        
        var viewModel = {
            manager: new GamesManager(),
            ui: ui,
            api: api,
            log: log
        }

        if (storage.foundCompatibleItem()) 
        {
            viewModel.manager = storage.load();
        }
        storage.autoSave(viewModel.manager);
       
        window.onblur = function() {
            storage.saveNow();
        };

        api.init(viewModel.manager);
        ko.applyBindings(viewModel);
    }
);
