var game = game || {};

(function (game) {
	function Battleship(data) {
        this.name = data.name;
        this.orientation = data.orientation;
        this.length = data.length;
        this.area = [];     // contains all the fields that a ship takes
        this.area.push(new game.Coordinate(data.coordinate))    // adds the first/starting coordinate

        while (--data.length){      // fills the rest of the coordinates that a ship takes
            var lastCoordinate = this.area[this.area.length -1];
            var orientation = "next" +  data.orientation[0].toUpperCase() + data.orientation.slice(1);
            this.area.push(lastCoordinate[orientation]());
        }  
	}

    Battleship.prototype.coordinates = function () {
        return this.area;
    };

    Battleship.prototype.firstCoordinate = function (){
        return this.area[0].getName();
    };

    Battleship.prototype.numberOfHits = function () {
        var destroyed = 0;
        this.area.forEach(function(c) {
            if(c.distroyed){
                destroyed++; 
            }
        });

        return destroyed;
    };

    Battleship.prototype.isDestroyed = function () {    // checks if a ship is distroyed after being hit
        return this.area.length == this.numberOfHits();
    };

    Battleship.prototype.hit = function (coordinateName) {  // if a field taken by a ship is hit, adds property distroyed on that coordinate
        this.area.map(function (c, index) {
            if(new game.Coordinate(coordinateName).isSame(c)){
                c.distroyed = true;
            }

            return c;
        });

        return this.isDestroyed();
    };

    Battleship.prototype.status = function () {     //  returns information/status on a ship
	    var shipArea = [];
	    this.area.forEach(function(s) {
	        shipArea.push(s.getName());
	    });
        shipArea = shipArea.join(",");

        return {
            name: this.name,
            length: this.length,
            coordinates: shipArea,
            hits: this.numberOfHits()
        };
    };
            
	game.Battleship = Battleship;
} (game));