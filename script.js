let player = document.getElementById('player'); // variabel for player
let point = document.getElementById('point'); // variabel for point eller obsticle
let bombe = document.getElementById('bombe');
let scoreDisplay = document.getElementById('score'); // variabel for score (points samles her)
let youWon = document.getElementById('winn'); // variabel for vinn-beskjed
let resetGame = document.getElementById('resetGame')
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
    checkBombe();
}

function checkCollision() {                           // collision detector
    let playerRect = player.getBoundingClientRect();
    let pointRect = point.getBoundingClientRect();

    if (playerRect.left < pointRect.right &&
        playerRect.right > pointRect.left &&
        playerRect.top < pointRect.bottom &&
        playerRect.bottom > pointRect.top) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score + '/2';
        movePoint();           // sjekker move point (obsticle)
    }

    if (score == 2) {
        document.getElementById('youWin').innerHTML = 'You win!';
        document.getElementById('restartGame').style.display = 'block';
        document.removeEventListener('keydown', movePlayer);
    }
}

if (score !== 2) {
    document.getElementById('restartGame').style.display = 'none';
}

function checkBombe() {                           // collision detector
    let playerRect = player.getBoundingClientRect();
    let bombeRect = bombe.getBoundingClientRect();

    if (playerRect.left < bombeRect.right &&
        playerRect.right > bombeRect.left &&
        playerRect.top < bombeRect.bottom &&
        playerRect.bottom > bombeRect.top) {
        score = 0;
        scoreDisplay.textContent = 'Score: ' + score + '/2';
        document.removeEventListener('keydown', movePlayer);
        document.getElementById('youWin').innerHTML = 'You lose!';
        document.getElementById('restartGame').style.display = 'block';
        moveBombe();           // sjekker move bombe (hinder)
    }
}
  
function movePoint() {     // point (obsticle) blir plassert random i feltet etter kollisjon
    let x = Math.floor(Math.random() * 480);
    let y = Math.floor(Math.random() * 480);
    point.style.left = x + 'px';
    point.style.top = y + 'px';
}

function moveBombe() {     // bombe (hinder) blir plassert random i feltet etter kollisjon
    let x = Math.floor(Math.random() * 480);
    let y = Math.floor(Math.random() * 480);
    bombe.style.left = x + 'px';
    bombe.style.top = y + 'px';
}

function restartGame() {
    document.addEventListener('keydown', movePlayer);
    document.getElementById('youWin').innerHTML = '';
    document.getElementById('restartGame').style.display = 'none';
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score + '/2';
    moveBombe();
    movePoint();
}

document.addEventListener('keydown', movePlayer); // funskjonen som tillater flytting av "player" med piltaster
movePoint();
moveBombe();
