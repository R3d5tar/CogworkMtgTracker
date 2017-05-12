define([], function () {
    var utils = {};

    utils.timeOfDayName = function () {
        var hour = new Date().getHours()
        if (hour < 12) {
            return "Morning"
        } else if (hour < 19){ 
            return "Afternoon";
        } else {
            return "Night"; 
        }
    }

    utils.guid = function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return utils;
});