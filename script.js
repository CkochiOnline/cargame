let player = document.getElementById('player'); // variabel for player
let point = document.getElementById('point'); // variabel for point eller obsticle
let scoreDisplay = document.getElementById('score'); // variabel for score (points samles her)
let score = 0;        // score starter på null

function movePlayer(event) {    // funskjon for "player", lager funskjon som kan styre "player"
    let x = player.offsetLeft;
    let y = player.offsetTop;

    switch(event.key) {    // switch - tilegner piltaster som styrer player
        case 'ArrowUp':
            y -= 10;
            break;
        case 'ArrowDown':
            y += 10;
            break;
        case 'ArrowLeft':
            x -= 10;
            break;
        case 'ArrowRight':
            x += 10;
            break;
    }

    player.style.left = x + 'px';
    player.style.top = y + 'px';
    
    checkCollision();            // sjekker collision for "player"
}

function checkCollision() {                           // collision detector
    let playerRect = player.getBoundingClientRect();
    let pointRect = point.getBoundingClientRect();

    if (playerRect.left < pointRect.right &&
        playerRect.right > pointRect.left &&
        playerRect.top < pointRect.bottom &&
        playerRect.bottom > pointRect.top) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        movePoint();           // sjekker move point (obsticle)
    }
}

function movePoint() {     // point (obsticle) blir plassert random i feltet etter kollisjon
    let x = Math.floor(Math.random() * 480);
    let y = Math.floor(Math.random() * 480);
    point.style.left = x + 'px';
    point.style.top = y + 'px';
}

document.addEventListener('keydown', movePlayer); // funskjonen som tillater flytting av "player" med piltaster
movePoint();
