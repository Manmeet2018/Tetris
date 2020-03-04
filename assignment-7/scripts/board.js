const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

const ROW = 20;
const COL = Column = 10;
const SQ = squareSixe = 20; // 20 pixle 
const VACANT = "GREY" // color of empty square;
let board = [];

// board intilization
function boardIntilize() {
    for(let r = 0; r < ROW; r++) {
        board[r] = [];
        for(let c =0; c < COL; c++)
            board[r][c] = VACANT;
        }
    }

// draw a cell (square in 2d) using canvas
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*SQ, y*SQ, SQ, SQ);

    context.strokeStyle = "black";
    context.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

// draw the board (2-D Array with white spaces)
function drawBoard() {
    for(let r = 0; r < ROW; r++) {
        for(let c =0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
