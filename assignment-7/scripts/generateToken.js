// generate a random token function 
const TOKENS = [
    [Z, "orange"],
    [S, "green"],
    [T, "blue"],
    [O, "yellow"],
    [L, "cyan"],
    [I, "purple"],
    [J, "red"]
];

// object to generate randomized Token
let tokenObj = randomToken();

function randomToken() {
    let randomNumber = Math.floor(Math.random() * TOKENS.length); // random number between 0-6
    return new Token(TOKENS[randomNumber][0], TOKENS[randomNumber][1]);
}

function Token(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoNumber  = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoNumber];

    //start position of each piece
    this.x = 3;
    this.y = -1 ;
}

// function to fill the color of the token
Token.prototype.fill = function(color) {
    for(let row = 0; row < this.activeTetromino.length; row++) {
        for(let col = 0; col < this.activeTetromino.length; col++) {
            if(this.activeTetromino[row][col]) {
                drawSquare(this.x + col, this.y + row, color);
            }
        }
    }
}

// function to draw token and set the given color
Token.prototype.draw = function() {
    this.fill(this.color);
}

// funtion to undraw and set the color to vacent color grey
Token.prototype.unDraw = function() {
    this.fill(VACANT);
}