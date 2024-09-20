const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 400;

let train = [{ x: 100, y: 100 }];
let trainDirection = 'RIGHT';
let newDirection = 'RIGHT';
let gasCan = { x: 200, y: 200 };
let gameOver = false;
let gamePaused = false;
let gameInterval;

const trainImage = new Image();
trainImage.src = 'train.png'; // Path to the train image

const gasCanImage = new Image();
gasCanImage.src = 'gas-can.png'; // Path to the gas can image

function drawTrain() {
    train.forEach(segment => {
        ctx.drawImage(trainImage, segment.x, segment.y, gridSize, gridSize);
    });
}

function drawGasCan() {
    ctx.drawImage(gasCanImage, gasCan.x, gasCan.y, gridSize, gridSize);
}

function moveTrain() {
    const head = { ...train[0] };

    switch (newDirection) {
        case 'LEFT':
            head.x -= gridSize;
            break;
        case 'RIGHT':
            head.x += gridSize;
            break;
        case 'UP':
            head.y -= gridSize;
            break;
        case 'DOWN':
            head.y += gridSize;
            break;
    }

    if (isCollision(head)) {
        gameOver = true;
        clearInterval(gameInterval);
        return;
    }

    train.unshift(head);

    if (head.x === gasCan.x && head.y === gasCan.y) {
        generateNewGasCan();
    } else {
        train.pop();
    }
}

function isCollision(head) {
    return (
        head.x < 0 ||
        head.x >= canvasWidth ||
        head.y < 0 ||
        head.y >= canvasHeight ||
        train.some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function generateNewGasCan() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
        y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
    } while (train.some(segment => segment.x === x && segment.y === y));

    gasCan = { x, y };
}

function drawGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawTrain();
    drawGasCan();
}

function updateGame() {
    if (!gameOver && !gamePaused) {
        moveTrain();
        drawGame();
    }
}

function gameLoop() {
    gameInterval = setInterval(updateGame, 200); // Adjust game speed here
}

function pauseGame() {
    gamePaused = true;
    document.getElementById('pauseButton').classList.add('hidden');
    document.getElementById('playButton').classList.remove('hidden');
}

function playGame() {
    gamePaused = false;
    document.getElementById('pauseButton').classList.remove('hidden');
    document.getElementById('playButton').classList.add('hidden');
}

function displayGameOver() {
    const gameOverDiv = document.getElementById('gameOver');
    gameOverDiv.classList.remove('hidden');
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a': // Move left
            if (trainDirection !== 'RIGHT') newDirection = 'LEFT';
            break;
        case 'd': // Move right
            if (trainDirection !== 'LEFT') newDirection = 'RIGHT';
            break;
        case 'w': // Move up
            if (trainDirection !== 'DOWN') newDirection = 'UP';
            break;
        case 's': // Move down
            if (trainDirection !== 'UP') newDirection = 'DOWN';
            break;
    }
});

document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('playButton').addEventListener('click', playGame);

// Initialize game loop
gameLoop();
