const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

const ROW = 20;
const COL = Column = 10;
const SQ = squareSixe = 20; // 20 pixle 
const VACANT = "GREY" // color of empty square;

const score = document.getElementById("score");
let scoreBoard = 0;

// hashing of token on the basis of color
const TOKENS = [
    [Z, "orange"],
    [S, "green"],
    [T, "blue"],
    [O, "yellow"],
    [L, "cyan"],
    [I, "purple"],
    [J, "red"]
];

// draw a cell (square in 2d) 
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*SQ, y*SQ, SQ, SQ);

    context.strokeStyle = "black";
    context.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

// board intilization
let board = [];
for(let r = 0; r < ROW; r++) {
    board[r] = [];
    for(let c =0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// draw the board (2-D Array with white spaces)
function drawBoard() {
    for(let r = 0; r < ROW; r++) {
        for(let c =0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();

//Token fucntion contains the property of single Token
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


// generate a random token function 
function randomToken() {
    let randomNumber = Math.floor(Math.random() * TOKENS.length); // random number between 0-6
    return new Token(TOKENS[randomNumber][0], TOKENS[randomNumber][1]);
}

// object to generate randomized Token
let tokenObj = randomToken();

// function used to check the collisions 
Token.prototype.collisions = function(x, y, token) {
    for(let r = 0; r < token.length; r++) {
        for(let c = 0; c < token.length; c++) {
            if(!token[r][c])
                continue;
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if(newX < 0 || newX >= COL || newY >= ROW)
                return true;
            if(newY < 0) // at the start point there should not be the collisions
                continue;
            if(board[newY][newX] != VACANT) // if the board is locked by a token or not
                return true;
        }
    }
    return false;
}

// prototype will help to move the token to down position
Token.prototype.moveDown = function() {
    if(!this.collisions(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }
    else {
        this.occupyPosition(); // ocuupy the position when we hit the collision
        tokenObj = randomToken();
    }
}

// prototype will help to move the token to right position
Token.prototype.moveRight = function() {
    if(!this.collisions(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// prototype will help to move the token to left position
Token.prototype.moveLeft = function() {
    if(!this.collisions(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// prototype will help to rotate the token. 
Token.prototype.rotateToken = function () {
    let nextPattern =   this.tetromino[(this.tetrominoNumber + 1) % this.tetromino.length];
    let wallcollision = 0;
    if(this.collisions(0, 0, nextPattern)) {
        console.log(this.x);
        (this.x > COL/2) ? (wallcollision = -1) : (wallcollision = 1);
    }
    if(!this.collisions(wallcollision, 0, nextPattern)) {
        this.unDraw();
        this.x += wallcollision;
        this.tetrominoNumber = (this.tetrominoNumber + 1) % this.tetromino.length; // modulo index based on length
        this.activeTetromino = this.tetromino[this.tetrominoNumber]; // change the active tetromino
        this.draw();
    }
}

// event listner to control the keydown arrow keys
document.addEventListener("keydown", control);

// prototype will help to set the board position and occupy the place
Token.prototype.occupyPosition = function() {
    for(let row = 0; row < this.activeTetromino.length; row++) {
        for(let col = 0; col < this.activeTetromino.length; col++) {
            if(!this.activeTetromino[row][col]) {
                continue;
            }
            if(this.y + row < 0) {
                window.alert("Game Over");
                isGameOver = true;
                break;
            }
            board[this.y + row][this.x + col] = this.color;
        }
    }
    // remove full rows if the row is full
    for(let row = 0; row < ROW; row++) {
        let isRowFull = 1;
        for(let col = 0; col < COL; col++) {
           isRowFull &= (board[row][col] != VACANT); 
        }
        // we move all the rows down 
        if(isRowFull) {
            for(let indexR = row; indexR > 0; indexR--) {
                 for(let indexC = 0; indexC < COL; indexC++)
                    board[indexR][indexC] = board[indexR-1][indexC];
            }
            scoreBoard += 100;
            score.innerHTML = scoreBoard;
        }
    }
    drawBoard();
}

// function to control all the keypress events
function control(event) {
    if(event.keyCode == 37) {
        tokenObj.moveLeft();
        dropStartTime = Date.now();
    }
    else if(event.keyCode == 38) {
        tokenObj.rotateToken();
        dropStartTime = Date.now();
    }
    else if(event.keyCode == 39) {
        tokenObj.moveRight();
        dropStartTime = Date.now();
    }
    else if(event.keyCode == 40) {
        tokenObj.moveDown();
        dropStartTime = Date.now();
    }
}

// function to make the default drop of token 
let dropStartTime = Date.now(); // o of milliseconds elapsed 
let isGameOver = false;
function defaultDrop() {
    let nowTime = Date.now();
    let differenceTime = nowTime - dropStartTime;
    if((differenceTime > 1000)) {
        tokenObj.moveDown();
        dropStartTime = Date.now();
    }
    if(!isGameOver)
        requestAnimationFrame(defaultDrop);
}
// console.log(Token.prototype);   
defaultDrop();
