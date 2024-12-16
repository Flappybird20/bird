const character = document.getElementById("character");
const obstacle = document.getElementById("block");
const hole = document.getElementById("hole");
const scoreboard = document.getElementById("scoreboard");

let y = 400; 
let speed = 80; 
let gravity = -5; 
let block_x = 800; 
let score = 0;

let Jump = true 

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && Jump == true) {
        y += speed;
        Jump = false
        setTimeout((timeout) => {
            Jump = true
        }, 100);
    }
    if (y > 500) y = 500; 
    character.style.bottom = y + 'px';
});

function Gravity() {
    y += gravity;
    if (y < 0) y = 0; 
    character.style.bottom = y + 'px';
}

function moveObstacle() {
    block_x -= 5; 
    if (block_x < -50) { 
        block_x = 800;
        hole.style.bottom = Math.random() * 300 + 'px'; 
        score++; 
        scoreboard.textContent = `Score: ${score}`;
    }
    obstacle.style.left = block_x + 'px';
}

function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    if (
        characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        (characterRect.bottom > holeRect.bottom || characterRect.top < holeRect.top)
    ) {
        alert("Game Over!");
        score = 0;
        scoreboard.textContent = `Score: ${score}`;
        block_x = 800; 
        y = 400; 
    }
}

setInterval(() => {
    Gravity();
    moveObstacle();
    checkCollision();
}, 20);
