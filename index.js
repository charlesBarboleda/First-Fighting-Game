const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.75

const shop = new Sprite ({
    position: {
        x: 600,
        y: 130,
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6,
    framesCurrent: 1

})

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
})

const player = new Fighter({
    position:{ 
        x: 100, 
        y: 100,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    framesCurrent: 1,
    offset: {
        x: 200,
        y: 155
    },
});
const enemy = new Fighter({
    position:{ 
        x: 900, 
        y: 300,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    color: "yellow",
    offset: {
        x: -50,
        y: 0,
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    framesCurrent: 1,
    offset: {
        x: 275,
        y: 170
    },
    
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}


countdownTimer()


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
    } else if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y = -10
    } 

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
    } else if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y = -10
    }

    // collision detection
    if (playerCollision({ rect1: player, rect2: enemy }) && player.isAttacking) {
            player.isAttacking = false
            enemy.health -= 10
            enemyHealth.style.width = enemy.health + "%"
        }
    if (playerCollision({ rect1: enemy, rect2: player }) && enemy.isAttacking) {
            enemy.isAttacking = false
            player.health -= 10
            playerHealth.style.width = player.health + "%"

        }

    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
} 

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            player.lastKey = 'w'
            break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 's':
            player.attack()
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            enemy.lastKey = 'ArrowUp'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})