define(['msgpack'], function (msgpack) {
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

    utils.filenameTimestamp = function () {
        return new Date().toJSON();
    }

    utils.currentTimeString = function () {
        return new Date().toLocaleDateString();
    }

    utils.encodeToUrlParam = function (jsonObject) {
        var buffer = msgpack.encode(jsonObject);
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer))); //eslint-disable-line no-undef
    }

     utils.decodeFromUrlParam = function (urlParam) {
        var stringWithBytes = atob(urlParam);
        var buffer = new Uint8Array(stringWithBytes.length); //eslint-disable-line no-undef
        for( var i = 0; i < stringWithBytes.length; i++) {
            buffer[i] = stringWithBytes.charCodeAt(i);
        }
        return msgpack.decode(buffer);
    }

    return utils;
});