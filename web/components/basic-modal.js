define(['jquery', 'jquery.validate'], function ($) {
    $(document).ready(function () {
        $('form').validate();
    });

    return function BasicModal(params) {
        this.title = params.title;
        this.message = params.message;
        this.context = params.with;

        this.active = params.active;
        if (!this.active) 
            this.active = this.context.active;

        this.okCallback = params.okCallback;
        if (!this.okCallback)
            this.okCallback = this.context.okCallback;
        if (!this.okCallback)
            this.okCallback = function () { this.active(false) };
        
        this.cancelCallback = params.cancelCallback;
        if (!this.cancelCallback)
            this.cancelCallback = this.context.cancelCallback;
        if (!this.cancelCallback)
            this.cancelCallback = function () { this.active(false) };

        this.buttonNegative = "Cancel";
        if (params.buttonNegative)
            this.buttonNegative = params.buttonNegative;

        this.buttonPositive = "OK";
        if (params.buttonPositive)
            this.buttonPositive = params.buttonPositive;

        this.internalSubmit = function (form) {
            if ($(form).valid()) {
                this.okCallback();
            }
            return false; //stopDefaultActions
        }
    }

});