boardIntilize();
drawBoard(); 
boardIntilize();
defaultDrop();

// event listner to control the keydown arrow keys
document.addEventListener("keydown", control);

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