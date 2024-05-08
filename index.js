const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.4
class Sprite {
    constructor({ position, velocity, color = "blue", offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw() {
        // player box
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking){
            c.fillStyle = "green"
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)}
        }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y 
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity 
    }

    attack() {
        this.isAttacking = true
        setTimeout( () => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
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
});
const enemy = new Sprite({
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

function playerCollision({ rect1 , rect2 }) {
    return (
        rect1.position.x < rect2.position.x + rect2.attackBox.width &&
        rect1.position.x + rect1.attackBox.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.attackBox.height &&
        rect1.position.y + rect1.attackBox.height > rect2.position.y
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    displayText.style.display = "flex"
    if (player.health === enemy.health) {
        displayText.innerHTML =  "TIE!"
    } else if (player.health > enemy.health) {
        displayText.innerHTML =  "BLUE WINS!"
    } else if (player.health < enemy.health) {
        displayText.innerHTML =  "YELLOW WINS!"
    }
}

let timerCounter = 21
let timerId
function countdownTimer () {
    if (timerCounter > 0) {
        timerId = setTimeout(countdownTimer, 1000)
        timerCounter--
        timer.innerHTML = timerCounter
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }

}

countdownTimer()


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
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