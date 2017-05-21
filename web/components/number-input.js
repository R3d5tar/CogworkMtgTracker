define(['ko', 'text!./number-input.html'], function (ko, htmlString) {

    var componentViewModel = function (params) {
        this.label = ko.ensureObservable(params.label);
        this.value = ko.ensureObservable(params.value);
        this.required = ko.ensureObservable(params.required);
        this.min = ko.ensureObservable(params.min);
        this.max = ko.ensureObservable(params.max);
        
        this.adjust = function (amount) {
            var newValue = parseInt(this.value()) + amount;
            if (newValue < this.min()) {
                newValue = this.min();
            } else if (newValue > this.max()) {
                newValue = this.max();
            }
            this.value(newValue);
        }.bind(this);
    }

    return { viewModel: componentViewModel, template: htmlString }; 
});