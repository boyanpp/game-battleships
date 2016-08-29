var game = game || {};

(function(game) {

    // Generated test data
	var board = new game.GameBoard(10, 10);
   
    var battleship1 = new game.Battleship({
        'length': 5,
        'name':'Prince of Wales',
        'orientation':'vertical' ,
        'coordinate': 'E3'    
    }),
    	battleship2 = new game.Battleship({
        'length': 2,
        'name':'King George V',
        'orientation':'horizontal' ,
        'coordinate': 'B4'    
    }),
    	battleship3 = new game.Battleship({
        'length': 3,
        'name':'Duke of York',
        'orientation':'vertical' ,
        'coordinate': 'A1'    
    }),
    	battleship4 = new game.Battleship({
        'length': 4,
        'name':'Anson',
        'orientation':'horizontal' ,
        'coordinate': 'A3'    
    }),
    	battleship5 = new game.Battleship({
        'length': 5,
        'name':'Anson',
        'orientation':'horizontal' ,
        'coordinate': 'F10'    
    }),
        battleship6 = new game.Battleship({
        'length': 5,
        'name':'Implacable',
        'orientation':'horizontal' ,
        'coordinate': 'J1'    
    });
    
    board.addShip(battleship1); console.log(board.ships);
    board.addShip(battleship2); console.log(board.ships);
    board.addShip(battleship3); console.log(board.ships);
    board.addShip(battleship4); console.log(board.ships);
    board.addShip(battleship5); console.log(board.ships);
    board.addShip(battleship6); console.log(board.ships);
    board.updateTiles()
    console.table(board.tiles);

    console.log(board.ships);
    console.log(board.getShipsStatus());
    console.log(board.fires(new game.Coordinate("A1")));
    console.log(board.fires(new game.Coordinate("A1")));
    console.log(board.fires(new game.Coordinate("A2")));
    console.log(board.fires(new game.Coordinate("A3")));
    console.log(board.fires(new game.Coordinate("A4")));
    console.log(board.fires(new game.Coordinate("C4")));
    console.log(board.fires(new game.Coordinate("B4")));
    console.log(board.fires(new game.Coordinate("B4")));
    console.log(board.fires(new game.Coordinate("B5")));
    console.log(board.fires(new game.Coordinate("E7")));
    console.log(board.fires(new game.Coordinate("C4")));
    console.log(board.fires(new game.Coordinate("H10")));
    console.log(board.getShipsStatus());

}(game));