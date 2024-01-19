const gameContainer = document.getElementById('gameContainer');
const dinosaur = document.getElementById('dinosaur');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let isJumping = false;
let isGameOver = false;
let score = 0;

document.addEventListener('keydown', jump);

function jump(event) {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        isJumping = true;
        jumpUp();
    }
}

function jumpUp() {
    let position = 0;

    const jumpInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(jumpInterval);
            jumpDown();
        } else {
            position += 5;
            dinosaur.style.bottom = position + 'px';
        }
    }, 20);
}

function jumpDown() {
    let position = 100;

    const jumpDownInterval = setInterval(() => {
        if (position === 0) {
            clearInterval(jumpDownInterval);
            isJumping = false;
        } else {
            position -= 5;
            dinosaur.style.bottom = position + 'px';
        }
    }, 20);
}

function createObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    // Randomly choose obstacle color
    const obstacleColor = Math.random() < 0.5 ? '#ff0000' : '#ff4500';
    obstacle.style.backgroundColor = obstacleColor;

    obstacle.style.left = '400px'; // Initial position
    obstacle.style.animationDuration = Math.random() * 2 + 1 + 's';
    gameContainer.appendChild(obstacle);

    const obstacleMoveInterval = setInterval(() => {
        const currentPosition = parseInt(obstacle.style.left);
        if (currentPosition <= 0) {
            clearInterval(obstacleMoveInterval);
            gameContainer.removeChild(obstacle);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;

            if (score === 5) {
                winGame();
            }
        } else {
            obstacle.style.left = currentPosition - 5 + 'px';
            if (
                currentPosition > 0 &&
                currentPosition < 50 &&
                dinosaur.style.bottom === '0px'
            ) {
                loseGame();
            }
        }
    }, 20);
}

function winGame() {
    isGameOver = true;
    messageDisplay.textContent = 'Congratulations!  You won!';
    messageDisplay.style.color = 'green';
}

function loseGame() {
    isGameOver = true;
    messageDisplay.textContent = 'Game Over! You lost!';
    messageDisplay.style.color = 'red';
}

setInterval(createObstacle, 3000);
