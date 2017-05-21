define(['ko', 'jquery'], function (ko, $) {

    ko.components.register('basic-modal', { require: 'components/basic-modal' });
    ko.components.register('share-buttons', { require: 'components/share-buttons'});
    ko.components.register('number-input', { require: 'components/number-input' });

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

    ko.readValue = function (item) {
        if (ko.isObservable(item)) {
            return ko.readValue(item());
        } else {
            return item;
        }
    }
});