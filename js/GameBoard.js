var game = game || {};

(function (game) {
    function GameBoard(xLength, yLength) {
        this.tiles = []; // represent the games board
        this.ships = []; // contain information on each ship added to the board
        this.xLength = xLength;
        this.yLength = yLength;
        this.coordinatesShot = [];  // contain all coordinates been shot

        var lettersArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                if (!this.tiles[x]) this.tiles[x] = [];
                this.tiles[x][y] = 0;
            }
        }
    }

    GameBoard.prototype.getShipsStatus = function () {      // returns the status of all the ships on a board
        var allShipsOnTheBoard = {};
        this.ships.forEach(function (s) {
            allShipsOnTheBoard[s.name] = s.status();
        });

        return allShipsOnTheBoard;
    };

    GameBoard.prototype.updateTiles = function () {     // updates the tiles array, marking the occupied fields by ships with "X"
        this.allShipsArea().forEach(function (c) {
            this.tiles[c.getY()][c.getX()] = "X";
        }.bind(this));
    };

    GameBoard.prototype.allShipsArea = function () {    // returns taken area of all the ships on a board
        var allShips = [];
        this.ships.forEach(function (s) {
            s.area.forEach(function (c) {
                allShips.push(c);
            });
        });

        return allShips;
    };

    GameBoard.prototype.isSpaceAvailable = function () {
        return this.allShipsArea.length < this.xLength * this.yLength;
    };

    GameBoard.prototype.addShip = function (ship) {
        var
            allShipsArea = this.allShipsArea(),
            allShipsAreaLength = allShipsArea.length,
            canFit = true,
            existSameCoord = false,
            shouldAddShip = true;

        for (var j = 0; j < ship.area.length; j++) {
            var newCoord = ship.area[j];
            canFit = (      // checks if a ship will extend beyond the boundaries of the board
                newCoord.getX() >= 0 &&
                newCoord.getX() < this.xLength &&
                newCoord.getY() >= 0 &&
                newCoord.getY() < this.yLength);

            if (!canFit) {
                shouldAddShip = false;
                break;
            }

            for (var i = 0; i < allShipsArea.length; i++) {     // checks if a ship would overlap with another ship
                existSameCoord = allShipsArea[i].isSame(newCoord);
                if (existSameCoord) break;
            }

            if (existSameCoord) {
                shouldAddShip = false;
                break;
            }
        }

        if (shouldAddShip) {
            this.ships.push(ship);
        }

        return this.isSpaceAvailable();
    };

    GameBoard.prototype.fires = function (coordinate) {
        var isHit = false,
            isDestroyed = false,
            fireStatus = "",
            isAlreadyShot = false,
            nameOfShotShip = "";

        for (var i = 0; i < this.coordinatesShot.length; i++) {     // checks if the coordinate has already been shot
            if (coordinate.isSame(this.coordinatesShot[i])) {
                isAlreadyShot = true;
                break;
            }
        }

        if (!isAlreadyShot) {   // if not already shot - FIRE!
            this.coordinatesShot.push(coordinate);
            for (var i = 0; i < this.ships.length; i++) {
                if (isHit) { break; }   // For optimization purpose
                for (var j = 0; j < this.ships[i].area.length; j++) {
                    if (coordinate.getName() === this.ships[i].area[j].getName()) {
                        isHit = true;
                        nameOfShotShip = this.ships[i].name;
                        isDestroyed = this.ships[i].hit(coordinate.getName());
                        isDestroyed && (nameOfShotShip = this.ships[i].name);
                        break;  // For optimization purpose
                    }
                }
            }

            if (!isHit) {
                fireStatus = coordinate.getName() + "- Miss!";
            }
            else if (isDestroyed) {
                fireStatus = coordinate.getName() + "- Destroyed! Battleship(" + nameOfShotShip + ")";
            }
            else {
                fireStatus = coordinate.getName() + "- Hit! Battleship(" + nameOfShotShip + ")";
            }

            return fireStatus;
        }
        else {
            return "The coordinate(" + coordinate.getName() + ") has already been shot!"
        }
    };

    game.GameBoard = GameBoard;
} (game));