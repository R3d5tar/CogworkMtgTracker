define(['ko'], function (ko) {

    return function Modal(name, okCallback, cancelCallback) {
        this.name = ko.observable(name);
        this.active = ko.observable(false);
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;

        if (!this.okCallback) {
            this.okCallback = function () { this.active(false); };
        }

        if (!this.cancelCallback) {
            this.cancelCallback = function () { this.active(false); };
        }

        this.show = function () {
            this.active(true);
        }.bind(this);
    }

});