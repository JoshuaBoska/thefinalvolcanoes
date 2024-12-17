const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20; // Size of each snake segment
const rows = 20; // Number of rows
const columns = 20; // Number of columns

let snake = [
    { x: 9 * scale, y: 9 * scale },
    { x: 8 * scale, y: 9 * scale },
    { x: 7 * scale, y: 9 * scale }
];

let food = generateFood();
let direction = "RIGHT";
let score = 0;
let gameOver = false;

canvas.width = columns * scale;
canvas.height = rows * scale;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    if (gameOver) return alert("Game Over! Your score: " + score);

    setTimeout(function () {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        checkCollisions();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "white"; // Head of the snake is green
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= scale;
    if (direction === "DOWN") head.y += scale;
    if (direction === "LEFT") head.x -= scale;
    if (direction === "RIGHT") head.x += scale;

    snake.unshift(head);

    // If the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop(); // Remove the tail
    }
}

function generateFood() {
    let foodX = Math.floor(Math.random() * columns) * scale;
    let foodY = Math.floor(Math.random() * rows) * scale;

    return { x: foodX, y: foodY };
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, scale, scale);
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function checkCollisions() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

gameLoop();
