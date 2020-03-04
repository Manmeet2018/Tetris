// function to make the default drop of token 
let dropStartTime = Date.now(); // no of milliseconds elapsed from 1 jan 1970

function defaultDrop() {
    let nowTime = Date.now();
    let differenceTime = nowTime - dropStartTime;
    if((differenceTime > 500)) {
        tokenObj.moveDown();
        dropStartTime = Date.now();
    }
    if(!isGameOver)
        requestAnimationFrame(defaultDrop);
}