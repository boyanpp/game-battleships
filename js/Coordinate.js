var game = game || {};

(function (game) {
    function Coordinate(name) {     // Coordinate constructor with some useful methods
        var name = name,
            lettersArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            stringX = "",
            stringY = "";

        for (var i = 0; i < name.length; i++) {
            if ((name[i] | 0) == name[i]) {
                stringY += name[i];
            }
            else {
                stringX += name[i];
            }
        }

        var x = (Array.prototype.map.call(stringX + "", function (letter, index) {
            return lettersArray.indexOf(letter);
        })).join("") | 0,

            y = stringY | 0;

        return {
            getX: function () {     // returns xAxys
                return x;
            },
            getY: function () {
                return y - 1;       // returns yAxys
            },
            getName: function () {
                return name;
            },
            isSame: function (coordinate) {
                return name == coordinate.getName();
            },
            nextVertical: function () {
                return new Coordinate(stringX + (y + 1));
            },
            nextHorizontal: function () {
                return new Coordinate(lettersArray[x + 1] + y);
            }
        };
    };

    game.Coordinate = Coordinate;
} (game));