define(['sprintf', 'moment'], function (sprintf, moment) {
    //TODO: rewrite to pure KO.
    return new function () {
        var _out = null;

        this.init = function (element) {
            _out = element;
        }

        this.writeAction = function (action, result) {
            this.writeLine(
                sprintf.sprintf("%s | %s", action, result));
        }

        this.writeLine = function (line) {
            _out.innerText += sprintf.sprintf("\r\n[%s] %s", timestamp(), line);
            _out.innerText = _out.innerText.trim();
        }

        this.clear = function () {
            _out.innerText = "";
        }

        function timestamp() {
            return moment().format("HH:mm:ss");
        }
    }();

});