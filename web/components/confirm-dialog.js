define(['text!./confirm-dialog.html', 'ko', 'scripts/models/Modal', 'scripts/ui'], function (htmlString, ko, Modal, ui) {

    //note: Singleton VM
    var dialog = new Modal("confirm-dialog",
        function ok() {
            dialog.callback();
            dialog.active(false);
        });
    dialog.title = ko.observable();
    dialog.message = ko.observable();
    dialog.show = function (ctx) {
        dialog.callback = ctx.callback;
        dialog.title(ko.readValue(ctx.title));
        dialog.message(ko.readValue(ctx.message));
        dialog.active(true);
    }

    ui.dynamicModals.push(dialog);

    return {
        viewModel: { instance: dialog },
        template: htmlString,
        synchronous: true
    };

});