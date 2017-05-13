define(['jquery', 'jquery.validate'], function ($) {
    $(document).ready(function () {
        $('form').validate();
        // $("[name='positive']").rules( "add", {
        //     min: 0
        // });
    });

    return function BasicModal(params) {
        this.active = params.active; //TODO: build in fallback to with/context...
        this.title = params.title;
        this.message = params.message;
        this.context = params.with;

        //TODO: build in fallback to with/context...
        this.okCallback = function () { this.active(false) };
        if (params.okCallback)
            this.okCallback = params.okCallback;

        //TODO: build in fallback to with/context...
        this.cancelCallback = function () { this.active(false) };
        if (params.cancelCallback)
            this.cancelCallback = params.cancelCallback;

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