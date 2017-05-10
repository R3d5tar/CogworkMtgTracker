define (['ko'], function (ko) {

    return function UpdatePlayerLifeTotalModalViewModel(params) {
        this.shown = ko.observable(false);
        this.title = "Adjust Life";
        this.dropDownLabel = "Choose the player"; 
        this.dropDownOptions = ["Amy", "Boris", "Cindy"];
        this.dropDownSelection = ko.observable(null);
        this.numberLabel = "Set life total to:";
        this.numberValue = ko.observable(20);
        this.confirmText = "OK";
        this.confirmAction = function () {
            //shown(false);
            params.callback(this);
        }.bind(this);
    }

    //ko.applyBindings(new UpdatePlayerLifeTotalModalViewModel());

});