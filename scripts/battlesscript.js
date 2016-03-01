/**
 * Created by andrewhalsall on 2016-02-27.
 */
function init() {


    // Views

    var view = {
        displayMessage: function (msg) {
            var messageArea = document.getElementById("messageArea");
            messageArea.innerHTML = msg;
        },

        displayHit: function (location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
        },

        displayMiss: function (location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "miss");
        }
    }

    //view.displayHit("00");
    //view.displayMiss("34");
    //view.displayMiss("55");
    //view.displayHit("12");
    //view.displayMiss("25");
    //view.displayHit("26");
    //view.displayMessage("Tap tap, is this thing on?");


    //Model

    var model = {

        boardSize: 7,
        numShips: 3,
        shipLength: 3,
        shipsSunk: 0,

        ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
            {locations: ["12", "13", "14"], hits: ["", "", ""]},
            {locations: ["10", "11", "12"], hits: ["", "", ""]}],

        fire: function (guess) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = this.ships[i];
                var index = ship.locations.indexOf(guess);
                if (index >= 0) {
                    //we have a hit
                    ship.hits[index] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if (this.isSunk(ship)) {
                        view.displayMessage("You sank my Battleship!");
                        this.shipsSunk++;
                    }
                    return true;
                }
            }
            // it's a miss
            view.displayMiss(guess);
            view.displayMessage("You missed.");
            return false;
        },


        isSunk: function (ship) {
            for (var i = 0; i < this.shipLength; i++) {
                if (ship.hits[i] !== "hit") {
                    return false;
                }

            }
            return true;
        }
    };

    // Controller

    function parseGuess(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

        if (guess === null || guess.length !== 2) {
            alert("Please enter a letter and a number on the board.");
        } else {

            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var col = guess.charAt(1);
            //alert("Row is " + row + " and Column is " + col);

            if (isNaN(row) || isNaN(col)) {
                alert("Oops, that isn't on the board.");
            } else if (row < model.boardSize || col < model.boardSize) {
                alert("Oops, that's off the board!");
            } else {
                return row + col;
            }
            return null;
        }
    }

        var controller = {

            guesses: 0;

            processGuess:
                function (guess) {
                    var location = parseGuess(guess);
                    if (location) {
                        this.guesses++;
                        var hit = model.fire(location);
                        if (hit && model.shipsSunk === model.numShips) {
                            view.displayMessage("You sank all my Battleships, in " + this.guesses + " guesses.");
                        }
                    }
                 // process guesses and passes them to the model + detects end of game
                }


            }


        //console.log(parseGuess("A1"));

//console.log(parseGuess("B6"));
//console.log(parseGuess("G3"));
//console.log(parseGuess("H0"));
//console.log(parseGuess("A7"));

        //model.fire("53");
        //
        //model.fire("06");
        //model.fire("16");
        //model.fire("26");
        //model.fire("34");
        //model.fire("24");
        //model.fire("44");
        //model.fire("12");
        //model.fire("11");
        //model.fire("10");


        //
        //var ship2 = ships[1];
        //var locations = ship2.locations;
        //console.log("Ship 2 locations is " + locations);
        //
        //var ship3 = ships[2];
        //var hits = ship3.hits;
        //if ( hits[0] === "hit" ) {
        //    console.log("Ouch, hit, ship3, location 1");
        //}
        //
        //var ship1 = ships[0];
        //var hits = ship1.hits;
        //hits[2] = "hit";
        //if (hits[2] == "hit") {
        //    console.log("Hit, ship1, position 3");
        //}


}
window.onload = init;