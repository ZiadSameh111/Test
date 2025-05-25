// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player properties
let player = {
    x: canvas.width / 2 - 25, // Start in the middle horizontally
    y: canvas.height - 60,    // Start near the bottom
    width: 50,
    height: 50,
    color: 'red',             // Mario's traditional color
    speed: 5,
    dx: 0 // Change in x per frame
};

// Input states
let rightPressed = false;
let leftPressed = false;

// Event listeners for keyboard input
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Function to draw the player
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update game state
function update() {
    // Reset player's horizontal movement change
    player.dx = 0;

    // Move player based on input
    if (leftPressed) {
        player.dx = -player.speed;
    }
    if (rightPressed) {
        player.dx = player.speed;
    }

    // Update player position
    player.x += player.dx;

    // Keep player within canvas bounds
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Main game loop function
function gameLoop() {
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update game objects
    update();

    // 3. Draw game objects
    drawPlayer();

    // 4. Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
