define(['scripts/classes/gamesmanager'], function (GameManager) {

    var storage = new function () {
        var key = "cogwork-v1";
        var timestampKey = "cogwork-v1-ts"
        var saveObject = null; 
        var lastSavedTimeStamp = null;
        var timeout = 30*1000; //every 30 seconds: let's auto save.
        var self = this;
        
        this.foundCompatibleItem = function () {
            return !!(loadTimeStamp() && window.localStorage.getItem(key));
        }

        this.load = function () {
            lastSavedTimeStamp = loadTimeStamp();
            return GameManager.fromJsonObject(
                JSON.parse(
                    window.localStorage.getItem(key)
                ));
        }
        this.autoSave = function (object) {
            saveObject = object;
            this.doAutoSaveAndDelay();
        }

        this.saveNow = function () {
            var jsonToSave = JSON.stringify(saveObject.toJsonObject());
            var newTimestamp = new Date().valueOf();
            
            //check if last-saved time still matches..
            var savedTimeStamp = loadTimeStamp();
            if (savedTimeStamp != lastSavedTimeStamp) {
                throw "There is a conflict with the localStorage, it seams we aren't the only one modifing. Please close this tab or close an other tab and refresh this one...";
            }
            else
            {
                window.localStorage.setItem(key, jsonToSave);
                saveTimeStamp(newTimestamp);
            }

        }

        this.doAutoSaveAndDelay = function () {
            self.saveNow();
            setTimeout(self.doAutoSaveAndDelay, timeout);
        }

        var loadTimeStamp = function () {
            var item = window.localStorage.getItem(timestampKey);
            if (item)
                return parseInt(item);
            else
                return null;
        }

        var saveTimeStamp = function (newTimeStamp) {
            lastSavedTimeStamp = newTimeStamp;
            window.localStorage.setItem(timestampKey, newTimeStamp);
        }
    }

    return storage;
});