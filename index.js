const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

start();

function main() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const [key, value] of Object.entries(entityList)) {
        //console.log(key, value);
        for (let j = 0; j < entityList[key]?.length; j++) {
        entityList[key][j].update();
        try {//I have no clue at all why this part of code will give an error when the enemy is destroyed but this works ig
        entityList[key][j].draw();
        }
        catch (e) {
        }
        
        
    }
    }
    player.update();
    player.draw();
}
setInterval(main, 30);


function gameEnd() {

}


canvas.addEventListener("click", function(){
    b = new Bullet(player.gunAngle, player.position.x, player.position.y, player.bulletSpeed);
    entityList.bullet.push(b);
    //console.log( b);
});

canvas.addEventListener("mousemove", findMousePos);
let mousePos = {};

let pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

function findMousePos(event) {
    //needed to get mouse position relative to the canvas
    var rect = canvas.getBoundingClientRect();
    mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top};
    //console.log(event.clientX - rect.left, event.clientY - rect.top);


}