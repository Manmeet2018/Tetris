const score = document.getElementById("score");
let scoreBoard = 0;
let isGameOver = false;

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
        for(let col = 0; col < COL; col++) {  // check if the col for the corresponding row is occupied or not.
           isRowFull &= (board[row][col] != VACANT);
        }
        // we move all the rows down when rowisfull
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
// prototype will help to move the token to down position
Token.prototype.moveDown = function() {
    if(!this.collisions(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }
    else {
        this.occupyPosition(); // ocuupy the position when we hit the collision
        tokenObj = randomToken(); // call new token when the token occupied the position.
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