define(['text!./basic-modal.html', 'jquery', 'jquery.validate'], function (htmlString, $) {
    $(document).ready(function () {
        $('form').validate();
    });

    var componentViewModel = function (params) {
        this.context = params.with;
        this.hideNegative = !!params.hideNegative;
        this.hidePositive = !!params.hidePositive;

        this.title = params.title;
        if (!this.title) 
            this.title = this.context.title;

        this.message = params.message;
        if (!this.message) 
            this.message = this.context.message;

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

    return { viewModel: componentViewModel, template: htmlString }; 
});