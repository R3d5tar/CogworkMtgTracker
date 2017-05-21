define(['ko', 'jquery'], function (ko, $) {

    ko.components.register('basic-modal', {
        viewModel: { //TODO: refactor to move viewModel and template to viewModel file
            require: 'components/basic-modal'
        },
        template: {
            require: 'text!components/basic-modal.html'
        }
    });
    ko.components.register('share-buttons', {
        viewModel: { //TODO: refactor to move viewModel and template to viewModel file
            require: 'components/share-buttons'
        },
        template: {
            require: 'text!components/share-buttons.html'
        }
    });
    ko.components.register('number-input', {
        require: 'components/number-input'
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

    ko.ensureObservable = function (item) {
        if (ko.isObservable(item)) {
            return item;
        } else {
            return ko.observable(item);
        }
    }
});