/**
 * Created by andrewhalsall on 2016-02-27.
 */
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations()
    console.log(model.ships);
}

function handleFireButton () {
    //code to get the value from the form
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress (e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

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
        },

        hideGuessInp: function () {
            var guessingArea = document.getElementById("inputArea");
            guessingArea.className = "hidden";
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

        ships: [    {locations: [0, 0, 0], hits: ["", "", ""]},
                    {locations: [0, 0, 0], hits: ["", "", ""]},
                    {locations: [0, 0, 0], hits: ["", "", ""]}
                ],

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
                }       // if
            }       // for
            // it's a miss
            view.displayMiss(guess);
            view.displayMessage("You missed.");
            return false;
        }, //fire


        isSunk: function (ship) {
            for (var i = 0; i < this.shipLength; i++) {
                if (ship.hits[i] !== "hit") {
                    return false;
                }

            } //for
            return true;
        }, //isSunk

        generateShipLocations: function() {
            var locations;
            for (var i= 0; i < this.numShips; i++) {
                do {
                    locations = this.generateShip();
                } while (this.collision(locations));
                this.ships[i].locations = locations;
            }
        },

        generateShip: function () {
            var direction = Math.floor(Math.random() * 2);
            var row;
            var col;
            if (direction === 1) {
                //generate string location for a horizontal ship
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1 ));
            } else {
                //generate string location for a vertical ship
                row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                col = Math.floor(Math.random() * this.boardSize);
            }

            var newShipLocations = [];
            for (var i=0; i < this.shipLength; i++) {
                if (direction === 1) {
                    // add location array for a new horizontal ship
                    newShipLocations.push(row + "" + (col + i));
                } else {
                    // add location array for a new vertical ship
                    newShipLocations.push((row + i) + "" + col);
                }
            }
            return newShipLocations;
        },

        collision: function (locations) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = this.ships[i];
                for (var j = 0; j < locations.length; j++) {
                    if (ship.locations.indexOf(locations[j]) >= 0) {
                        return true;
                    }
                }

            }
            return false;
        }

    }; // End of Model



    // Controller

    var controller = {
        guesses: 0,

        processGuess:
            function (guess) {
                var location = parseGuess(guess);
                if (location) {
                    this.guesses++;
                    var hit = model.fire(location);
                    if (hit && model.shipsSunk === model.numShips) {
                        controller.endGame();
                    }
                }
            },

        endGame:
            function () {
                view.displayMessage("You sank all my Battleships, in " + this.guesses + " guesses.");
                view.hideGuessInp();
            }
        };

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
        } else if (row > model.boardSize || row < 0 ||
            col > model.boardSize || col < 0) {
            alert("Oops, " + row + " " + col + " is off the board!");
        } else {
            return row + col;
        }
    }
    return null;
}

    //controller.processGuess("A0");
    //
    //controller.processGuess("A6");
    //controller.processGuess("B6");
    //controller.processGuess("C6");
    //
    //controller.processGuess("C4");
    //controller.processGuess("D4");
    //controller.processGuess("E4");
    //
    //controller.processGuess("B0");
    //controller.processGuess("B1");
    //controller.processGuess("B2");


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



window.onload = init;