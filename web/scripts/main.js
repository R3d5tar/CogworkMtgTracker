if (!requirejs) {
    requirejs = require;
}

requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        ko: 'bower_components/knockout/dist/knockout',
        moment: 'bower_components/moment/min/moment.min',
        sprintf: 'bower_components/sprintf/src/sprintf',
        text: 'bower_components/text/text'
    }
});


requirejs(
    ["scripts/classes/gamesmanager", "ko", "scripts/log", "scripts/ui", "scripts/api"], 
    function(GamesManager, ko, log, ui, api) {

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
        api.init(viewModel.manager);

        ko.applyBindings(viewModel);
    }
);
