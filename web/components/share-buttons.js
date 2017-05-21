define(['sprintf', 'ko'], function (sprintf, ko) {

    return function ShareButtons(params) {
        var self = this;
        this.text = params.text;
        this.rawUrl = params.url;

        //whatsapp://send?text=Cogwork%20MTG%20Tracker%20-%20Shared-state%20%20TIMESTAMP%20THIS_IS_MY_URL
        this.whatsAppUrl = ko.pureComputed(function () {
            var rawUrl = self.rawUrl();

            return sprintf.sprintf(
                "whatsapp://send?text=%s",
                encodeURIComponent(rawUrl + " " + self.text())
            );
        }).bind(this);
        //mailto:?subject=Cogwork%20MTG%20Tracker%20-%20Shared-state%20%20TIMESTAMP&amp;body=THIS_IS_MY_URL
        this.emailUrl = ko.pureComputed(function () {
            return sprintf.sprintf(
                "mailto:?subject=%s&amp;body=%s",
                encodeURIComponent(self.text()),
                encodeURIComponent(self.rawUrl())
            );
        }).bind(this);
        //https://telegram.me/share/url?text=Cogwork%20MTG%20Tracker%20-%20Shared-state%20%20TIMESTAMP&amp;url=THIS_IS_MY_URL
        this.telegramUrl = ko.pureComputed(function () {
            return sprintf.sprintf("https://telegram.me/share/url?text=%s&amp;url=%s",
                encodeURIComponent(self.text()),
                encodeURIComponent(self.rawUrl())
            );
        }).bind(this);

        //this.facebookUrl =  

    }

});