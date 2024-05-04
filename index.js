const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2
class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity 
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
    }
});

const enemy = new Sprite({
    position:{ 
        x: 900, 
        y: 300,
    },
    velocity: {
        x: 0,
        y: 10,
    }
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
    s: {
        pressed: false,
    },
}

let lastKey


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -2
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 2
    } else if (keys.w.pressed && lastKey === 'w') {
        player.velocity.y = -7
    } else if (keys.s.pressed && lastKey === 's') {
        player.velocity.y = 7
    }
} 

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})